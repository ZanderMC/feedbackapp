 import feedback from "../schemas/feedback.js"
import type { CreateFeedbackInput, State, UpdateFeedbackInput } from "../schemas/feedback.shema.js";


class feedbackModel {

  constructor() { }

  getAll() {
    return feedback.find().sort({ createdAt: -1 });
  }

  getById(id: string) {
    return feedback.findById(id);
  }

  create(input: CreateFeedbackInput) {
    const state: State = 'RECIBIDO';
    const newFeedback = {
      title: input.title,
      description: input.description,
      ...(input.imageUrl !== undefined ? { imageUrl: input.imageUrl } : {}),
      state,
      votes: 0,
    }
    return feedback.create(newFeedback);
  }

  async update(id: string | string[] | undefined, changes: UpdateFeedbackInput) {
    return feedback.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true, runValidators: true },
    );
  }


  async delete(id: string | string[] | undefined) {
    return await feedback.findByIdAndDelete(id)
  }

}

export default new feedbackModel();
