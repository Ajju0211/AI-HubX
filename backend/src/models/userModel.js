
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    lastLogoin: {
        type: Date,
        default: Date.now,
    },

    isVerified: {
        type : Boolean,
        default: false
    }, 

    resetPasswordToken: String,
    resetPasswordExpriresAt: Date,
    verificationToken: String,
    verificationTokenExpriresAT: Date
}, {timestamps: true});

export const User = mongoose.model("Userdb", userSchema);

