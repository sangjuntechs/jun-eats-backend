import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    //데이터베이스에 이메일이 있는지 확인
    //만약 없다면 유저 생성하고 비밀번호 hashing
    try {
      //데이터베이스에 같은 이메일이 있는지 확인
      const exists = await this.users.findOne({ email });
      if (exists) {
        //error
        return { ok: false, error: '같은 이메일이 이미 존재합니다.' };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true };
    } catch (error) {
      return { ok: false, error: '계정을 생성할 수 없습니다.' };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    //email을 가진 user찾기
    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        return {
          ok: false,
          error: '유저를 찾을 수 없습니다.',
        };
      }
      //password 맞는지 확인
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: '비밀번호가 일치하지 않습니다.',
        };
      }
      return {
        ok: true,
        token: 'sangjuntoken',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
    //JWT만들고 유저에게 전달
  }
}
