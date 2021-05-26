import { CoreEntity } from 'src/common/entities/core.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
declare enum UserRole {
    Client = 0,
    Owner = 1,
    Delivery = 2
}
export declare class User extends CoreEntity {
    email: string;
    password: string;
    role: UserRole;
    verified: boolean;
    restaurants: Restaurant[];
    hashPassword(): Promise<void>;
    checkPassword(aPassword: string): Promise<boolean>;
}
export {};
