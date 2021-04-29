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
exports.Resturant = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let Resturant = class Resturant {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Resturant.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    class_validator_1.IsString(),
    class_validator_1.Length(5),
    __metadata("design:type", String)
], Resturant.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => Boolean),
    typeorm_1.Column(),
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], Resturant.prototype, "isVegan", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Resturant.prototype, "address", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Resturant.prototype, "ownerName", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Resturant.prototype, "categoryName", void 0);
Resturant = __decorate([
    graphql_1.InputType({ isAbstract: true }),
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], Resturant);
exports.Resturant = Resturant;
//# sourceMappingURL=resturant.entity.js.map