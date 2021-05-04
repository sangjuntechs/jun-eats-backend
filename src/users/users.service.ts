import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({ email, password, role }: CreateAccountInput) {
    //데이터베이스에 이메일이 있는지 확인
    //만약 없다면 유저 생성하고 비밀번호 hashing
    try {
      //데이터베이스에 같은 이메일이 있는지 확인
      const exists = await this.users.findOne({ email });
      if (exists) {
        //error
        return;
      }
      await this.users.save(this.users.create({ email, password, role }));
      return true;
    } catch (error) {
      return;
    }
  }
}
