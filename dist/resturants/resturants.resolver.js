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
const create_resturant_dto_1 = require("./dtos/create-resturant.dto");
const resturant_entity_1 = require("./entities/resturant.entity");
const resturants_service_1 = require("./resturants.service");
let ResturantsResolver = class ResturantsResolver {
    constructor(resturantService) {
        this.resturantService = resturantService;
    }
    resturants() {
        return this.resturantService.getAll();
    }
    async createRestaurant(createResturantDto) {
        console.log(createResturantDto);
        try {
            await this.resturantService.createResturant(createResturantDto);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
__decorate([
    graphql_1.Query(() => [resturant_entity_1.Resturant]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResturantsResolver.prototype, "resturants", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_resturant_dto_1.createResturantDto]),
    __metadata("design:returntype", Promise)
], ResturantsResolver.prototype, "createRestaurant", null);
ResturantsResolver = __decorate([
    graphql_1.Resolver(() => resturant_entity_1.Resturant),
    __metadata("design:paramtypes", [resturants_service_1.ResturantService])
], ResturantsResolver);
exports.ResturantsResolver = ResturantsResolver;
//# sourceMappingURL=resturants.resolver.js.map