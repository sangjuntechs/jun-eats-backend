import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UsersService } from './users.service';

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findOneOrFail: jest.fn(),
  delete: jest.fn(),
});

const mockJwtService = {
  sign: jest.fn(() => 'signed-token'),
  verify: jest.fn(),
};

const mockMailService = {
  sendVerificationEmail: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: MockRepository<User>;
  let verificationRepository: MockRepository<Verification>;
  let mailService: MailService;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockRepository(),
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
    mailService = module.get<MailService>(MailService);
    verificationRepository = module.get(getRepositoryToken(Verification));
    jwtService = module.get<JwtService>(JwtService);
  });
  it('usersService가 정의 되는가', () => {
    expect(service).toBeDefined();
  });
  describe('계정 생성', () => {
    const createAccountArg = {
      email: '',
      password: '',
      role: 0,
    };
    it('이미 같은 유저가 존재하는 경우', async () => {
      usersRepository.findOne.mockResolvedValue({
        id: 1,
        email: 'akel@fnkef.com',
      });
      const result = await service.createAccount(createAccountArg);
      expect(result).toMatchObject({
        ok: false,
        error: '같은 이메일이 이미 존재합니다.',
      });
    });
    it('새로운 유저를 생성하는 경우', async () => {
      usersRepository.findOne.mockReturnValue(undefined);
      usersRepository.create.mockReturnValue(createAccountArg);
      usersRepository.save.mockResolvedValue(createAccountArg);
      verificationRepository.create.mockReturnValue({
        user: createAccountArg,
      });
      verificationRepository.save.mockResolvedValue({
        code: 'code',
      });
      const result = await service.createAccount(createAccountArg);
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(usersRepository.create).toHaveBeenCalledWith(createAccountArg);
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledWith(createAccountArg);
      expect(verificationRepository.create).toHaveBeenCalledTimes(1);
      expect(verificationRepository.create).toHaveBeenCalledWith({
        user: createAccountArg,
      });
      expect(verificationRepository.save).toHaveBeenCalledTimes(1);
      expect(verificationRepository.save).toHaveBeenCalledWith({
        user: createAccountArg,
      });
      expect(mailService.sendVerificationEmail).toHaveBeenCalledTimes(1);
      expect(mailService.sendVerificationEmail).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
      );
      expect(result).toEqual({ ok: true });
    });
    it('실패로 인한 예외처리', async () => {
      usersRepository.findOne.mockRejectedValue(new Error());

      const result = await service.createAccount(createAccountArg);
      expect(result).toEqual({
        ok: false,
        error: '계정을 생성할 수 없습니다.',
      });
    });
  });
  describe('로그인', () => {
    const loginArg = {
      email: 'elfm@ef.com',
      password: 'elfm',
    };

    it('유저가 존재하지 않아 실패하는 경우', async () => {
      usersRepository.findOne.mockResolvedValue(null);
      const result = await service.login(loginArg);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object),
      );
      expect(result).toEqual({
        ok: false,
        error: '유저를 찾을 수 없습니다.',
      });
    });

    it('비밀번호가 틀려서 실패하는 경우', async () => {
      const mockedUser = {
        checkPassword: jest.fn(() => Promise.resolve(false)),
      };
      usersRepository.findOne.mockResolvedValue(mockedUser);
      const result = await service.login(loginArg);
      expect(result).toEqual({
        ok: false,
        error: '비밀번호가 일치하지 않습니다.',
      });
    });

    it('비밀번호 일치 시 토큰을 발급하는 경우', async () => {
      const mockedUser = {
        id: 1,
        checkPassword: jest.fn(() => Promise.resolve(true)),
      };
      usersRepository.findOne.mockResolvedValue(mockedUser);
      const result = await service.login(loginArg);
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith(expect.any(Number));
      expect(result).toEqual({ ok: true, token: 'signed-token' });
    });

    it('로그인이 실패하는 경우', async () => {
      usersRepository.findOne.mockRejectedValue(new Error());
      const result = await service.login(loginArg);
      expect(result).toEqual({ ok: false, error: '로그인 할 수 없습니다.' });
    });
  });

  describe('아이디로 유저 찾기', () => {
    const findByIdArg = {
      id: 1,
    };
    it('존재하는 유저를 찾았을 경우', async () => {
      usersRepository.findOneOrFail.mockResolvedValue(findByIdArg);
      const result = await service.findById(1);
      expect(result).toEqual({ ok: true, user: findByIdArg });
    });

    it('유저를 찾지 못했을 경우', async () => {
      usersRepository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.findById(1);
      expect(result).toEqual({ ok: false, error: '유저를 찾을 수 없습니다.' });
    });
  });
  describe('유저정보 수정', () => {
    it('이메일 변경', async () => {
      const oldUser = {
        email: 'sangjun@old.com',
        verified: true,
      };
      const editProfileArg = {
        userId: 1,
        input: { email: 'sangjun@new.com' },
      };
      const newVerification = {
        code: 'code',
      };
      const newUser = {
        verified: false,
        email: editProfileArg.input.email,
      };

      usersRepository.findOne.mockResolvedValue(oldUser);
      verificationRepository.create.mockReturnValue(newVerification);
      verificationRepository.save.mockResolvedValue(newVerification);

      await service.editProfile(editProfileArg.userId, editProfileArg.input);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledWith(
        editProfileArg.userId,
      );
      expect(verificationRepository.create).toHaveBeenLastCalledWith({
        user: newUser,
      });
      expect(verificationRepository.save).toHaveBeenCalledWith(newVerification);

      expect(mailService.sendVerificationEmail).toHaveBeenCalledWith(
        newUser.email,
        newVerification.code,
      );
    });
    it('비밀번호 변경', async () => {
      const editProfileArg = {
        userId: 1,
        input: { password: 'newPassword' },
      };
      usersRepository.findOne.mockResolvedValue({ password: 'oldPassword' });
      const result = await service.editProfile(
        editProfileArg.userId,
        editProfileArg.input,
      );
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledWith(editProfileArg.input);
      expect(result).toEqual({ ok: true });
    });

    it('유저정보 수정 실패하는 경우', async () => {
      const editProfileArg = {
        userId: 1,
        input: { password: 'newPassword' },
      };
      usersRepository.findOne.mockRejectedValue(new Error());
      const result = await service.editProfile(
        editProfileArg.userId,
        editProfileArg.input,
      );
      expect(result).toEqual({
        ok: false,
        error: '업데이트를 할 수 없습니다.',
      });
    });
  });
  describe('이메일 인증', () => {
    it('인증에 성공한 경우', async () => {
      const mockVerification = {
        user: {
          verified: false,
        },
        id: 1,
      };
      verificationRepository.findOne.mockResolvedValue(mockVerification);
      const result = await service.verifyEmail('');
      expect(verificationRepository.findOne).toHaveBeenCalledTimes(1);
      expect(verificationRepository.findOne).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object),
      );
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledWith({
        verified: true,
      });
      expect(verificationRepository.delete).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ ok: true });
    });

    it.todo('인증코드가 없는 경우');

    it.todo('인증에 실패한 경우');
  });
});
