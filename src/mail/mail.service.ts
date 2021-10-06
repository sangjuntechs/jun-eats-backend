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

  async sendEmail(
    subject: string,
    template: string,
    code: string,
    username: string,
  ): Promise<boolean> {
    const form = new FormData();
    form.append(
      'from',
      `Sangjun from JunEats <mailgun@${this.options.domain}>`,
    );
    form.append('to', `devjun0421@gmail.com`);
    form.append('subject', subject);
    form.append('template', template);
    form.append('v:code', code);
    form.append('v:username', username);
    try {
      await got.post(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Jun Eats 메일 인증', 'verify-email2', code, email);
  }
}
