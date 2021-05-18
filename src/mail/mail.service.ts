import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constant';
import { MailModuleOptions } from './mail.interfaces';
import got from 'got';
import * as FormData from 'form-data';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(
    subject: string,
    content: string,
    email: string,
    code: string,
  ) {
    const form = new FormData();
    form.append(
      'from',
      `Sangjun from JunEats <mailgun@${this.options.domain}>`,
    );
    form.append('to', `devjun0421@gmail.com`);
    form.append('subject', subject);
    form.append(
      'text',
      `안녕하세요 ${email}님, SangjunTech - JunEats입니다. ${content} 코드 "${code}"를 작성하고 인증해주십시오.`,
    );
    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail(
      '이메일을 인증해주세요 - JunEats',
      '이메일 인증 관련입니다.',
      email,
      code,
    );
  }
}
