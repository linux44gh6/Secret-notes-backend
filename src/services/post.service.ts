import { Types } from 'mongoose';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

import { getPagination, buildMeta } from '../utils/pagination';
import { CreatePostBody } from '../interfaces';
import AppError from '../utils/appError';

const createPost = async (userId: string, payload: CreatePostBody) => {
  return Post.create({
    title: payload.title,
    content: payload.content,
    author: userId,
  });
};

const getPostsByUser = async (userId: string, query:any) => {
  if (!Types.ObjectId.isValid(userId)) throw new AppError(400, 'Invalid user id');

  const { page, limit, skip } = getPagination(query);

  const result = await User.aggregate([

    { $match: { _id: new Types.ObjectId(userId) } },
    { $project: { name: 1, email: 1 } },

    {
      $lookup: {
        from: Post.collection.name,
        let: { uid: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$author', '$$uid'] } } },
          { $sort: { createdAt: -1 } },
          {
            $facet: {
              items: [{ $skip: skip }, { $limit: limit }],
              total: [{ $count: 'count' }],
            },
          },
        ],
        as: 'result',
      },
    },
    { $unwind: '$result' },

    {
      $project: {
        name: 1,
        email: 1,
        posts: '$result.items',
        total: { $ifNull: [{ $arrayElemAt: ['$result.total.count', 0] }, 0] },
      },
    },
  ]);

  if (result.length === 0){
    throw new AppError(404, 'User not found');
  }

  const { total, ...data } = result[0];
  return { data, meta: buildMeta(page, limit, total) };
};

export const postService = { createPost, getPostsByUser };