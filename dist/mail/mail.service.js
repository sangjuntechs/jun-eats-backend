"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const common_constant_1 = require("../common/common.constant");
const got_1 = require("got");
const FormData = require("form-data");
let MailService = class MailService {
    constructor(options) {
        this.options = options;
    }
    async sendEmail(subject, content, email, code) {
        const form = new FormData();
        form.append('from', `Sangjun from JunEats <mailgun@${this.options.domain}>`);
        form.append('to', `devjun0421@gmail.com`);
        form.append('subject', subject);
        form.append('text', `안녕하세요 ${email}님, JunEats입니다. ${content} 코드 "${code}"를 작성하고 인증해주십시오.`);
        try {
            await got_1.default(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${Buffer.from(`api:${this.options.apiKey}`).toString('base64')}`,
                },
                body: form,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    sendVerificationEmail(email, code) {
        this.sendEmail('이메일을 인증해주세요 - JunEats', '이메일 인증 관련입니다.', email, code);
    }
};
MailService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_constant_1.CONFIG_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map