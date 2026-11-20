import { Request, Response } from 'express';
import { CatchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { postService } from '../services/post.service';


const createPost = CatchAsync(async (req: Request, res: Response) => {
  const result = await postService.createPost(req.user!.id, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Post Created Successfully',
    data: result,
  });
});

const getPostsByUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await postService.getPostsByUser(req.params.userId as string, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Posts Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const postController = { createPost, getPostsByUser };