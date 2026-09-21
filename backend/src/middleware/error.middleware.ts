import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { env } from '../config/env';
import { logger } from '../config/logger';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  void _next;
  logger.error({ err: error }, 'Unhandled request error');

  if (error instanceof ZodError) {
    response.status(400).json({
      success: false,
      message: 'Validation failed',
      issues: error.issues,
    });
    return;
  }

  response.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(env.NODE_ENV === 'development' && error instanceof Error
      ? { error: error.message }
      : {}),
  });
};
