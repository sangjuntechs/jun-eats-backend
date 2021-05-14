"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MailModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const common_constant_1 = require("../common/common.constant");
let MailModule = MailModule_1 = class MailModule {
    static forRoot(options) {
        return {
            module: MailModule_1,
            providers: [
                {
                    provide: common_constant_1.CONFIG_OPTIONS,
                    useValue: options,
                },
            ],
            exports: [],
        };
    }
};
MailModule = MailModule_1 = __decorate([
    common_1.Module({})
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map