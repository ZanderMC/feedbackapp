import mongoose from "mongoose";
import { maxLength } from "zod";


const feedbackSchema = new mongoose.Schema(
{
  
  title: {
    type: String,
    required: true,
    maxLength : 25
  },
  description: {
    type: String,
    required: true,
    maxLength:250
  },
  imageUrl: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: true,
    enum :["RECIBIDO" , "RECHAZADO" , "EN_REVICION" , "PLANEADO" , "EN_PROGRESO" , "IMPLEMENTADO"],
    default: "RECIBIDO"
  },
  votes: {
    type: Number,
    required: true,
    min : [0, 'votes cant be negative']
  },
},
{
  timestamps: true,
  toJSON: { virtuals: true },
}
);

export default mongoose.model('feedback', feedbackSchema)
 