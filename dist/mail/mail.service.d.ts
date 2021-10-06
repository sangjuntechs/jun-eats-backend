import { MailModuleOptions } from './mail.interfaces';
export declare class MailService {
    private readonly options;
    constructor(options: MailModuleOptions);
    sendEmail(subject: string, template: string, code: string, username: string): Promise<boolean>;
    sendVerificationEmail(email: string, code: string): void;
}
