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
    async sendEmail(subject, template, code, username) {
        const form = new FormData();
        form.append('from', `Sangjun from JunEats <mailgun@${this.options.domain}>`);
        form.append('to', `devjun0421@gmail.com`);
        form.append('subject', subject);
        form.append('template', template);
        form.append('v:code', code);
        form.append('v:username', username);
        try {
            await got_1.default.post(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${Buffer.from(`api:${this.options.apiKey}`).toString('base64')}`,
                },
                body: form,
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }
    sendVerificationEmail(email, code) {
        this.sendEmail('Jun Eats ?????? ??????', 'verify-email2', code, email);
    }
};
MailService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_constant_1.CONFIG_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map