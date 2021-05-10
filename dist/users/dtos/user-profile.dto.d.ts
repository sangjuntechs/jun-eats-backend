import { MutationOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';
export declare class UserProfileInput {
    userId: number;
}
export declare class UserProfileOutput extends MutationOutput {
    user?: User;
}
