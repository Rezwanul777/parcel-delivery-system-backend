/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { UserServices } from './user.service';
import  httpStatus  from 'http-status-codes';


const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await UserServices.getAllUsers(query as Record<string, string>);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getSingleUser(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved',
    data: result,
  });
});




const toggleBlockUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isBlocked } = req.body;

  const result = await UserServices.toggleBlockUser(id, isBlocked);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `User has been ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
    data: result,
  });
});



export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  toggleBlockUser,
};