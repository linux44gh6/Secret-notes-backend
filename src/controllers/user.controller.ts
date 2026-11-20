import { Request, Response } from 'express';
import { CatchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { userService } from '../services/user.service';

const createUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

const getAllUsers = CatchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await userService.getSingleUser(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Retrieved Successfully',
    data: result,
  });
});

const updateUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await userService.updateUser(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Updated Successfully',
    data: result,
  });
});

const deleteUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await userService.deleteUser(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Deleted Successfully',
    data: result,
  });
});

const getUsersGroupedByInterests = CatchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUsersGroupedByInterests(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users Grouped By Interests Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUsersGroupedByInterests,
};