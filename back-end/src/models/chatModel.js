import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    chat: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const chatModel = mongoose.model('Chate', chatSchema);

