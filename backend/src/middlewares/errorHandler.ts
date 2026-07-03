import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  status?: number;
  message: string;
}

export function createError(message: string, status: number = 500): AppError {
  const error = new Error(message) as AppError;
  error.status = status;
  return error;
}

export function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${status}: ${message}`);

  res.status(status).json({
    error: message,
    status,
  });
}
