import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces';

interface IUserMethods {
  comparePassword(candidate: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
         type: String,
          required: true,
           trim: true,
            maxlength: 100 
        },
    email: {
        type: String, 
        required: true, 
        lowercase: true, 
        trim: true 
    },
    password: {
        type: String, 
        required: true, 
        minlength: 6, 
        select: false 
    },
    role: {
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user'
    },
    interests: {
        type: [String], 
        default: [], 
        set: (v: string[]) => v.map((i) => i.trim().toLowerCase()) },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });


userSchema.index({ interests: 1 });

// ---------- Password hashing ----------
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.method('comparePassword', function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
});

export const User = model<IUser, UserModel>('User', userSchema);