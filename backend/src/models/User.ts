import mongoose, { Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface UserDoc extends Document {
  email: string;
  password: string;
  role: 'worker' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['worker', 'admin'],
      default: 'worker',
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// Remove password from JSON response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserModel = mongoose.model<UserDoc>('User', userSchema);
