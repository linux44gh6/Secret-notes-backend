import { LoginBody, RegisterBody } from '../interfaces';
import { User } from '../models/user.model';
import AppError from '../utils/appError';

import { signToken } from '../utils/jwt';

const register = async (payload: RegisterBody) => {
  const { name, email, password, interests } = payload;

  if (!name || !email || !password) {
    throw new AppError(400, 'name, email and password are required');
  }
  if (password.length < 6) {
    throw new AppError(400, 'Password must be at least 6 characters');
  }
  if (interests !== undefined && !Array.isArray(interests)) {
    throw new AppError(400, 'interests must be an array of strings');
  }

  // শুধু নির্দিষ্ট ফিল্ড নেওয়া হচ্ছে, role জোর করে 'user'
  // তাই রেজিস্টারে কেউ নিজেকে admin বানাতে পারবে না
  const user = await User.create({
    name,
    email,
    password,
    interests: interests ?? [],
    role: 'user',
  });

  const token = signToken({ id: user._id.toString(), role: user.role });

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      interests: user.interests,
    },
  };
};

const login = async (payload: LoginBody) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError(400, 'email and password are required');
  }

  // index: { email: 1 }
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

  // ইমেইল ভুল বা পাসওয়ার্ড ভুল, দুই ক্ষেত্রেই একই মেসেজ
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError(401, 'Invalid email or password');
  }

  const token = signToken({ id: user._id.toString(), role: user.role });

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      interests: user.interests,
    },
  };
};

// index: default _id
const getMe = async (userId: string) => {
  const user = await User.findById(userId).lean();
  if (!user) throw new AppError(404, 'User not found');
  return user;
};

export const authService = { register, login, getMe };