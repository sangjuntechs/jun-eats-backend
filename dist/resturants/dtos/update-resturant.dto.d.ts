import { createResturantDto } from './create-resturant.dto';
declare const UpdateResturantInputType_base: import("@nestjs/common").Type<Partial<createResturantDto>>;
export declare class UpdateResturantInputType extends UpdateResturantInputType_base {
}
export declare class UpdateResturantDto {
    id: number;
    data: UpdateResturantInputType;
}
export {};
