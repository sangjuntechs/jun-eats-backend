import { Test } from '@nestjs/testing';
import { CONFIG_OPTIONS } from 'src/common/common.constant';
import { MailService } from './mail.service';

// eslint-disable-next-line @typescript-eslint/no-empty-function
jest.mock('got', () => {});
jest.mock('form-data', () => {
  return {
    append: jest.fn(),
  };
});

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: CONFIG_OPTIONS,
          useValue: {
            apiKey: 'test-apiKey',
            domain: 'test-domain',
            fromEmail: 'test-fromEmail',
          },
        },
      ],
    }).compile();
    service = module.get<MailService>(MailService);
  });
  it('정의가 되는가', () => {
    expect(service).toBeDefined();
  });
  it('메일 보내기', () => {
    const EMAIL = 'email';
    const CODE = 'code';
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(service, 'sendEmail').mockImplementation(async () => {});
    service.sendVerificationEmail(EMAIL, CODE);
    expect(service.sendEmail).toHaveBeenCalledTimes(1);
    expect(service.sendEmail).toHaveBeenLastCalledWith(
      '이메일을 인증해주세요 - JunEats',
      '이메일 인증 관련입니다.',
      EMAIL,
      CODE,
    );
  });
  it.todo('인증메일보내기');
});
