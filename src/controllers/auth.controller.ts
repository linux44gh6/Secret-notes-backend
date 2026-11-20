import { Request, Response } from 'express';

import { authService } from '../services/auth.service';
import { CatchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';

const register = CatchAsync(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Registered Successfully',
    data: result,
  });
});

const login = CatchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logged In Successfully',
    data: result,
  });
});

const getMe = CatchAsync(async (req: Request, res: Response) => {
  const result = await authService.getMe(req.user!.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile Retrieved Successfully',
    data: result,
  });
});

export const authController = { register, login, getMe };