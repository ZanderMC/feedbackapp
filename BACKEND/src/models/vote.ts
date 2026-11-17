import type { Types } from "mongoose";
import vote from "../schemas/vote.js";

function isDuplicateKeyError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
}

class VoteModel {
  async add(feedbackId: string, voterId: string) {
    try {
      await vote.create({ feedbackId, voterId });
    } catch (error) {
      if (!isDuplicateKeyError(error)) {
        throw error;
      }
    }
  }

  remove(feedbackId: string, voterId: string) {
    return vote.deleteOne({ feedbackId, voterId });
  }

  removeForFeedback(feedbackId: string) {
    return vote.deleteMany({ feedbackId });
  }

  countForFeedback(feedbackId: string) {
    return vote.countDocuments({ feedbackId });
  }

  countByFeedbackIds(feedbackIds: Types.ObjectId[]) {
    if (feedbackIds.length === 0) {
      return Promise.resolve([]);
    }

    return vote.aggregate<{ _id: Types.ObjectId; count: number }>([
      { $match: { feedbackId: { $in: feedbackIds } } },
      { $group: { _id: "$feedbackId", count: { $sum: 1 } } },
    ]);
  }

  async getFeedbackIdsForVoter(voterId: string, feedbackIds: Types.ObjectId[]) {
    if (feedbackIds.length === 0) {
      return [];
    }

    const voterVotes = await vote
      .find({ voterId, feedbackId: { $in: feedbackIds } })
      .select("feedbackId")
      .lean();

    return voterVotes.map(({ feedbackId }) => feedbackId.toString());
  }
}

export default new VoteModel();
