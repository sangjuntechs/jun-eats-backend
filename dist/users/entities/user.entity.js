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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const restaurant_entity_1 = require("../../restaurants/entities/restaurant.entity");
const order_entity_1 = require("../../orders/entities/order.entity");
const payment_entity_1 = require("../../payments/entities/payment.entity");
var UserRole;
(function (UserRole) {
    UserRole["Client"] = "Client";
    UserRole["Owner"] = "Owner";
    UserRole["Delivery"] = "Delivery";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
graphql_1.registerEnumType(UserRole, { name: 'UserRole' });
let User = class User extends core_entity_1.CoreEntity {
    async hashPassword() {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            }
            catch (error) {
                console.log(error);
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async checkPassword(aPassword) {
        try {
            const ok = await bcrypt.compare(aPassword, this.password);
            return ok;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
};
__decorate([
    graphql_1.Field((type) => String),
    typeorm_1.Column({ unique: true }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    graphql_1.Field((type) => String),
    typeorm_1.Column({ select: false }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    graphql_1.Field((type) => UserRole),
    typeorm_1.Column({ type: 'enum', enum: UserRole }),
    class_validator_1.IsEnum(UserRole),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    graphql_1.Field((type) => Boolean),
    typeorm_1.Column({ default: false }),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
__decorate([
    graphql_1.Field((type) => [restaurant_entity_1.Restaurant]),
    typeorm_1.OneToMany((type) => restaurant_entity_1.Restaurant, (restaurant) => restaurant.owner),
    __metadata("design:type", Array)
], User.prototype, "restaurants", void 0);
__decorate([
    graphql_1.Field((type) => [order_entity_1.Order]),
    typeorm_1.OneToMany((type) => order_entity_1.Order, (order) => order.customer),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    graphql_1.Field((type) => [payment_entity_1.Payment]),
    typeorm_1.OneToMany((type) => payment_entity_1.Payment, (payment) => payment.user, { eager: true }),
    __metadata("design:type", Array)
], User.prototype, "payments", void 0);
__decorate([
    graphql_1.Field((type) => [order_entity_1.Order]),
    typeorm_1.OneToMany((type) => order_entity_1.Order, (order) => order.driver),
    __metadata("design:type", Array)
], User.prototype, "rides", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    graphql_1.InputType('UserInputType', { isAbstract: true }),
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map