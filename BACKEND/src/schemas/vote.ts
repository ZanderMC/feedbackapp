import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    feedbackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "feedback",
      required: true,
    },
    voterId: {
      type: String,
      required: true,
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    },
  },
  { timestamps: true },
);

voteSchema.index({ feedbackId: 1, voterId: 1 }, { unique: true });

export default mongoose.model("vote", voteSchema);
