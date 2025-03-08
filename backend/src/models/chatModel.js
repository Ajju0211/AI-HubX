import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  chat: {type: String, required: true}, // User's message
  imageUrl: {type: String}, // Image Url
  response: { type: String, required: true}, // AI/Bot's response
  timestamp: {type: Date, default: Date.now} // Time of message
})

const chatSchema = new mongoose.Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, required: true}, // User's ID
  messageId: {type: String, required: true}, // Unique message ID for each chat session
  chats: [messageSchema] // Array of messages

}, {timesstamp: {type: Date, default: Date.now}});

export const chatModel = mongoose.model('chat', chatSchema);

