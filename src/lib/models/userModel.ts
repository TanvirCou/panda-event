import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        default: "user",
    },
    photo: {
        type: String,
        required: true,
        // default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export const User = mongoose.models?.users || mongoose.model("users", userSchema);