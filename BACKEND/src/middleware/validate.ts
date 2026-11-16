import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import { ApiError } from "../utils/ApiError.js";

export function validate(schema: ZodType): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(new ApiError(
        400,
        "VALIDATION_ERROR",
        "Los datos enviados no son válidos",
        result.error.issues.map(({ path, message }) => ({ path, message })),
      ));
    }

    req.body = result.data;
    return next();
  };
}
