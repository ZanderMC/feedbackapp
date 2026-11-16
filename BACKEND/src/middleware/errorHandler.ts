import type { ErrorRequestHandler, RequestHandler } from "express";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return new ApiError(
      400,
      "VALIDATION_ERROR",
      "Los datos no son válidos",
      Object.values(error.errors).map(({ path, message }) => ({ path, message })),
    );
  }

  if (error instanceof mongoose.Error.CastError) {
    return new ApiError(400, "INVALID_ID", "El identificador no es válido");
  }

  if (isRecord(error)) {
    if (error.code === 11000) {
      return new ApiError(409, "DUPLICATE_RESOURCE", "El recurso ya existe");
    }

    if (error.type === "entity.parse.failed") {
      return new ApiError(400, "INVALID_JSON", "El cuerpo JSON no es válido");
    }

    if (error.type === "entity.too.large") {
      return new ApiError(413, "PAYLOAD_TOO_LARGE", "El cuerpo de la solicitud es demasiado grande");
    }
  }

  return new ApiError(500, "INTERNAL_SERVER_ERROR", "Ocurrió un error interno");
}

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new ApiError(404, "NOT_FOUND", "La ruta solicitada no existe"));
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  const apiError = normalizeError(error);

  if (apiError.statusCode >= 500) {
    console.error("API error", {
      method: req.method,
      path: req.path,
      errorName: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
  }

  return res.status(apiError.statusCode).json({
    error: {
      code: apiError.code,
      message: apiError.message,
      ...(apiError.details !== undefined ? { details: apiError.details } : {}),
    },
  });
};
