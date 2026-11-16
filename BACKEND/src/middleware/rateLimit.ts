import { rateLimit } from "express-rate-limit";

 
export const feedbackWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 4,
  legacyHeaders: false,
  message: {
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Demasiadas escrituras. Intenta más tarde.",
    },
  },
});

 
export const feedbackUpdateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  legacyHeaders: false,
  message: {
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Demasiadas actualizaciones. Intenta más tarde.",
    },
  },
});