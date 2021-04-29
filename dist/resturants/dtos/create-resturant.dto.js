"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResturantDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const resturant_entity_1 = require("../entities/resturant.entity");
let createResturantDto = class createResturantDto extends graphql_1.OmitType(resturant_entity_1.Resturant, ['id']) {
};
createResturantDto = __decorate([
    graphql_1.InputType()
], createResturantDto);
exports.createResturantDto = createResturantDto;
//# sourceMappingURL=create-resturant.dto.js.map