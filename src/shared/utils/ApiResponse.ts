import { Response } from "express";

export const ApiResponse = {
  success: <T>(res: Response, message: string, data: T, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message: message,
      data,
    });
  },

  error: (res: Response, message: string, statusCode = 400) => {
    return res.status(statusCode).json({
      success: false,
      error: message,
    });
  },

  created: <T>(res: Response, message: string, data: T) => {
    return ApiResponse.success(res, message, data, 201);
  },
};
