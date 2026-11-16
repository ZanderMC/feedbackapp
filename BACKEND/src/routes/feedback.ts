import express from 'express'
import feedbackController from '../controllers/feedback.js';
import { validate } from '../middleware/validate.js';
import { CreateFeedbackSchema, UpdateFeedbackSchema } from '../schemas/feedback.shema.js';
import { feedbackWriteLimiter, feedbackUpdateLimiter } from '../middleware/rateLimit.js';
 
const route = express.Router();
 

route.get('/',  feedbackController.getAll  )

route.post("/", feedbackWriteLimiter, validate(CreateFeedbackSchema), feedbackController.create);

route.patch("/:id", feedbackUpdateLimiter, validate(UpdateFeedbackSchema), feedbackController.update);

route.delete("/:id", feedbackController.delete);

export default route