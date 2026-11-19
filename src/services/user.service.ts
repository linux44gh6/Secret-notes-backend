import { User } from '../models/user.model';
import { Note } from '../models/note.model';
import { Post } from '../models/post.model';


import { getPagination, buildMeta } from '../utils/pagination';
import AppError from '../utils/appError';
import { CreateUserBody, UpdateUserBody } from '../interfaces';

const createUser = async (payload: CreateUserBody) => {
  const user = await User.create(payload);
  const { password, ...result } = user.toObject();
  return result;
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const { page, limit, skip } = getPagination(query);

  const [data, total] = await Promise.all([
    User.find().sort({ _id: -1 }).skip(skip).limit(limit).lean(),
    User.countDocuments(),
  ]);

  return { data, meta: buildMeta(page, limit, total) };
};

const getSingleUser = async (id: string) => {
  const user = await User.findById(id).lean();
  if (!user){
     throw new AppError(404, 'User not found');
  }
  return user;
};

const updateUser = async (id: string, payload: UpdateUserBody) => {
  const user = await User.findById(id);
  if (!user){
    throw new AppError(404, 'User not found');
  }

  Object.assign(user, payload);
  await user.save();

  const { password, ...result } = user.toObject();
  return result;
};

const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user){
     throw new AppError(404, 'User not found');
  }
  await Promise.all([Note.deleteMany({ owner: id }), Post.deleteMany({ author: id })]);

  return null;
};

export const userService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};