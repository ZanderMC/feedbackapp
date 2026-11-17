import type { Request, Response } from "express";
import feedbackModel from "../models/feedback.js";
import { formatDate } from "../utils/formatDates.js";
import { ApiError } from "../utils/ApiError.js";
import { VoterIdSchema, type CreateFeedbackInput, type UpdateFeedbackInput } from "../schemas/feedback.shema.js";
import voteModel from "../models/vote.js";
import mongoose from "mongoose";

class feedbackController {

   constructor() { }

   async getAll(req: Request, res: Response) {
      const parsedVoterId = VoterIdSchema.optional().safeParse(req.query.voterId);
      if (!parsedVoterId.success) {
         throw new ApiError(400, "VALIDATION_ERROR", "El identificador del votante no es válido");
      }

      const feedbacks = await feedbackModel.getAll();
      const feedbackIds = feedbacks.map((item) => item._id);
      const [voteCounts, voterFeedbackIds] = await Promise.all([
         voteModel.countByFeedbackIds(feedbackIds),
         parsedVoterId.data
            ? voteModel.getFeedbackIdsForVoter(parsedVoterId.data, feedbackIds)
            : Promise.resolve([]),
      ]);
      const countsByFeedbackId = new Map(voteCounts.map(({ _id, count }) => [_id.toString(), count]));
      const votedFeedbackIds = new Set(voterFeedbackIds);

      return res.status(200).json(feedbacks.map((item) => {
         const id = item._id.toString();
         return {
            ...item.toJSON(),
            votes: item.votes + (countsByFeedbackId.get(id) ?? 0),
            hasVoted: votedFeedbackIds.has(id),
            createdAt: formatDate(item.createdAt),
         };
      }));
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
      const feedbackId = req.params.id;
      if (typeof feedbackId !== "string" || !mongoose.isValidObjectId(feedbackId)) {
         throw new ApiError(400, "INVALID_FEEDBACK_ID", "El identificador del feedback no es válido");
      }

      const deletedFeedback = await feedbackModel.delete(feedbackId);
      if (!deletedFeedback) {
         throw new ApiError(404, "FEEDBACK_NOT_FOUND", "Feedback no encontrado");
      }

      await voteModel.removeForFeedback(feedbackId);
      return res.status(204).end();
   }

   async addVote(req: Request, res: Response) {
      const feedbackId = req.params.id;
      if (typeof feedbackId !== "string" || !mongoose.isValidObjectId(feedbackId)) {
         throw new ApiError(400, "INVALID_FEEDBACK_ID", "El identificador del feedback no es válido");
      }

      const feedback = await feedbackModel.getById(feedbackId);
      if (!feedback) {
         throw new ApiError(404, "FEEDBACK_NOT_FOUND", "Feedback no encontrado");
      }

      const { voterId } = req.body;
      await voteModel.add(feedbackId, voterId);
      const voteCount = await voteModel.countForFeedback(feedbackId);

      return res.status(200).json({
         votes: feedback.votes + voteCount,
         hasVoted: true,
      });
   }

   async removeVote(req: Request, res: Response) {
      const feedbackId = req.params.id;
      if (typeof feedbackId !== "string" || !mongoose.isValidObjectId(feedbackId)) {
         throw new ApiError(400, "INVALID_FEEDBACK_ID", "El identificador del feedback no es válido");
      }

      const feedback = await feedbackModel.getById(feedbackId);
      if (!feedback) {
         throw new ApiError(404, "FEEDBACK_NOT_FOUND", "Feedback no encontrado");
      }

      const { voterId } = req.body;
      await voteModel.remove(feedbackId, voterId);
      const voteCount = await voteModel.countForFeedback(feedbackId);

      return res.status(200).json({
         votes: feedback.votes + voteCount,
         hasVoted: false,
      });
   }



}

export default new feedbackController();