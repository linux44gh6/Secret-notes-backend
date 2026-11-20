import { PipelineStage } from 'mongoose';
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
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  return user;
};

const updateUser = async (id: string, payload: UpdateUserBody) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  // save() ব্যবহার করছি যাতে password বদলালে pre('save') hash করে
  Object.assign(user, payload);
  await user.save();

  const { password, ...result } = user.toObject();
  return result;
};

const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  // ইউজার মুছলে তার নোট ও পোস্টও মুছে ফেলা
  await Promise.all([Note.deleteMany({ owner: id }), Post.deleteMany({ author: id })]);

  return null;
};

// Scenario 1: ঠিক একটি aggregate() কল
const getUsersGroupedByInterests = async (query: Record<string, unknown>) => {
  const { page, limit, skip } = getPagination(query);
  const interest =
    typeof query.interest === 'string' ? query.interest.trim().toLowerCase() : undefined;

  const pipeline: PipelineStage[] = [];

  // ঐচ্ছিক ফিল্টার: multikey index { interests: 1 } এখানে কাজে লাগে
  if (interest) pipeline.push({ $match: { interests: interest } });

  pipeline.push({ $unwind: '$interests' });

  // unwind-এর পর আবার ফিল্টার, নইলে ওই ইউজারের অন্য interest-ও চলে আসবে
  if (interest) pipeline.push({ $match: { interests: interest } });

  pipeline.push(
    {
      $group: {
        _id: '$interests',
        count: { $sum: 1 },
        users: { $push: { _id: '$_id', name: '$name', email: '$email' } },
      },
    },
    { $sort: { _id: 1 } },
    {
      $facet: {
        data: [
          { $skip: skip },
          { $limit: limit },
          { $project: { _id: 0, interest: '$_id', count: 1, users: 1 } },
        ],
        total: [{ $count: 'count' }],
      },
    }
  );

  const [result] = await User.aggregate(pipeline);
  const total = result.total[0]?.count ?? 0;

  return { data: result.data, meta: buildMeta(page, limit, total) };
};

export const userService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUsersGroupedByInterests,
};