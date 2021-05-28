import { CoreEntity } from 'src/common/entities/core.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
export declare enum UserRole {
    Client = "Client",
    Owner = "Owner",
    Delivery = "Delivery"
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
