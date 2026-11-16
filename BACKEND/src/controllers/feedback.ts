import type { Request, Response } from "express";
import feedbackModel from "../models/feedback.js";
import { formatDate } from "../utils/formatDates.js";
import { ApiError } from "../utils/ApiError.js";
import type { CreateFeedbackInput, UpdateFeedbackInput } from "../schemas/feedback.shema.js";

class feedbackController {

   constructor() { }

   async getAll(_req: Request, res: Response) {
      const feedbacks = await feedbackModel.getAll();
      return res.status(200).json(feedbacks.map((item) => ({
         ...item.toJSON(),
         createdAt: formatDate(item.createdAt),
      })));
   }

   async create(req: Request, res: Response) {
      const { title, description, imageUrl }: CreateFeedbackInput = req.body;
      const newFeedback = await feedbackModel.create({
         title,
         description,
         ...(imageUrl !== undefined ? { imageUrl } : {}),
      });
      return res.status(201).json({
         response: "ok",
         data: {
            ...newFeedback.toJSON(),
            createdAt: formatDate(newFeedback.createdAt),
         },
      });
   }

   async update(req: Request, res: Response) {
      const changes: UpdateFeedbackInput = req.body;
      const updatedFeedback = await feedbackModel.update(req.params.id, changes);
      if (!updatedFeedback) {
         throw new ApiError(404, "FEEDBACK_NOT_FOUND", "Feedback no encontrado");
      }

      return res.status(200).json({
         response: "ok",
         data: {
            ...updatedFeedback.toJSON(),
            createdAt: formatDate(updatedFeedback.createdAt),
         },
      });
   }

   async delete(req: Request, res: Response) {
      const deletedFeedback = await feedbackModel.delete(req.params.id);
      if (!deletedFeedback) {
         throw new ApiError(404, "FEEDBACK_NOT_FOUND", "Feedback no encontrado");
      }

      return res.status(204).end();
   }




}

export default new feedbackController();