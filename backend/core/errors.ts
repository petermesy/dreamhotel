import { Request, Response, NextFunction } from "express";
import { logger } from "./logger.js";

// Base custom exception class
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

// 400 Bad Request / Validation error
export class ValidationError extends AppError {
  public readonly errors?: any;

  constructor(message: string, errors?: any) {
    super(message, 400);
    this.errors = errors;
  }
}

// 401 Unauthorized Error
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized: Authentication required") {
    super(message, 401);
  }
}

// 403 Forbidden Error
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden: Insufficient permissions") {
    super(message, 403);
  }
}

// 404 Not Found Error
export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

// 409 Conflict Error
export class ConflictError extends AppError {
  constructor(message = "Conflict occurred") {
    super(message, 409);
  }
}

// Async Handler to eliminate try-catch blocks in controller files
export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

// Centralized global error handling middleware
export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const isOperational = err instanceof AppError ? err.isOperational : false;

  const responsePayload = {
    error: err.message || "An unexpected error occurred",
    ...(err instanceof ValidationError && err.errors ? { details: err.errors } : {})
  };

  if (!isOperational) {
    logger.error(`Unhandled system error: ${err.message}`, err, {
      path: req.path,
      method: req.method,
      ip: req.ip
    });
  } else {
    logger.warn(`Operational application error: ${err.message}`, {
      statusCode,
      path: req.path,
      method: req.method,
      errors: err instanceof ValidationError ? err.errors : undefined
    });
  }

  res.status(statusCode).json(responsePayload);
}
