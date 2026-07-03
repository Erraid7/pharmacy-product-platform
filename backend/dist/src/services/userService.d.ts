import { CreateUserInput, UpdateUserInput } from '../validators/schemas.js';
export declare function createUser(input: CreateUserInput): Promise<import("../models/User.js").UserDoc & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare function getUsers(): Promise<(import("../models/User.js").UserDoc & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
})[]>;
export declare function getUserById(userId: string): Promise<import("../models/User.js").UserDoc & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare function updateUser(userId: string, input: UpdateUserInput): Promise<import("../models/User.js").UserDoc & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare function deleteUser(userId: string): Promise<import("../models/User.js").UserDoc & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=userService.d.ts.map