import { Test } from '@nestjs/testing';
import { CONFIG_OPTIONS } from 'src/common/common.constant';
import { MailService } from './mail.service';
import * as FormData from 'form-data';
import got from 'got';

// eslint-disable-next-line @typescript-eslint/no-empty-function
jest.mock('got');
jest.mock('form-data');

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
  describe('메일 보내기', () => {
    const EMAIL = 'email';
    const CODE = 'code';
    it('인증 메일이 보내지는가', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      jest.spyOn(service, 'sendEmail').mockImplementation(async () => true);
      service.sendVerificationEmail(EMAIL, CODE);
      expect(service.sendEmail).toHaveBeenCalledTimes(1);
      expect(service.sendEmail).toHaveBeenLastCalledWith(
        '이메일을 인증해주세요 - JunEats',
        '이메일 인증 관련입니다.',
        EMAIL,
        CODE,
      );
    });
  });

  describe('인증메일보내기', () => {
    it('이메일 보내기', async () => {
      const ok = await service.sendEmail(
        'subject',
        'contents',
        'email',
        'code',
      );
      const formSpy = jest.spyOn(FormData.prototype, 'append');
      expect(formSpy).toHaveBeenCalled();
      expect(got.post).toHaveBeenCalledTimes(1);
      expect(got.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
      );
      expect(ok).toEqual(true);
    });
    it('실패하게 될 경우', async () => {
      jest.spyOn(got, 'post').mockImplementation(() => {
        throw new Error();
      });
      const ok = await service.sendEmail('', '', '', '');
      expect(ok).toEqual(false);
    });
  });
});
