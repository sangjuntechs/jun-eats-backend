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
exports.ResturantsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const resturant_entity_1 = require("./entities/resturant.entity");
let ResturantsResolver = class ResturantsResolver {
    resturants(veganOnly) {
        return [];
    }
};
__decorate([
    graphql_1.Query(() => [resturant_entity_1.Resturant]),
    __param(0, graphql_1.Args('veganOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", Array)
], ResturantsResolver.prototype, "resturants", null);
ResturantsResolver = __decorate([
    graphql_1.Resolver(() => resturant_entity_1.Resturant)
], ResturantsResolver);
exports.ResturantsResolver = ResturantsResolver;
//# sourceMappingURL=resturants.resolver.js.map