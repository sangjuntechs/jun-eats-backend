import { CoreEntity } from 'src/common/entities/core.entity';
declare type userRole = 'client' | 'owner' | 'delivery';
export declare class User extends CoreEntity {
    email: string;
    password: string;
    role: userRole;
}
export {};
