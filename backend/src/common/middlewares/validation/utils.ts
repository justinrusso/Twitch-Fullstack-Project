import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import HttpError from "../../HttpError";

/**
 * Middleware to catch any errors found by express-validator middlewares
 * and formats them to be returned as a JSON response
 */
export const handleValidationErrors: RequestHandler = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors: Record<string, string> = {};

    Object.entries(validationErrors.mapped()).forEach(([param, errorObj]) => {
      errors[param] = errorObj.msg;
    });

    const error = new HttpError(400);
    error.errors = errors;
    return next(error);
  }
  next();
};
