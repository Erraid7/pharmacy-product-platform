import { LoginInput } from '../validators/schemas.js';
export declare function login(input: LoginInput): Promise<{
    token: string;
    user: import("../models/User.js").UserDoc & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    };
}>;
export declare function getUserById(userId: string): Promise<import("../models/User.js").UserDoc & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=authService.d.ts.map