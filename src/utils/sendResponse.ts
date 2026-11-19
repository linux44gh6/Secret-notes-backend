import { Response } from "express"


type TResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string;
    data: T;
};

export const sendResponse=<T>(res:Response,data:TResponse<T>)=>{
    res.status(data?.statusCode).json({
        status:data?.statusCode || 'success',
        message:data?.message || 'Request Successful',
        data:data?.data || null,
    })
}