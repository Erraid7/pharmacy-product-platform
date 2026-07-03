import mongoose, { Document } from 'mongoose';
export interface UserDoc extends Document {
    email: string;
    password: string;
    role: 'worker' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const UserModel: mongoose.Model<UserDoc, {}, {}, {}, mongoose.Document<unknown, {}, UserDoc, {}, mongoose.DefaultSchemaOptions> & UserDoc & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, UserDoc>;
//# sourceMappingURL=User.d.ts.map