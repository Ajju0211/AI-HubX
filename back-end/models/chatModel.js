import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    chat: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
}, {timestamps: true});

const chatModel = mongoose.model('Chat', chatSchema);

export default chatModel;