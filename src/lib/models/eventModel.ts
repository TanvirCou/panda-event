import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
    _id: string,
    title: string;
    description?: string;
    location?: string;
    imageUrl: string;
    createdAt: Date;
    startDateTime: Date;
    endDateTime: Date;
    price: string;
    isFree: boolean;
    url?: string;
    category: { _id: string, name: string }
    organizer: { _id: string, firstName: string, lastName: string }
}

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    }, 
    imageUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    startDateTime: {
        type: Date,
        default: Date.now(),
    },
    endDateTime: {
        type: Date,
        default: Date.now(),
    },
    price: {
        type: String
    },
    isFree: {
        type: Boolean,
        default: false
    },
    url: {
        type: String
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    organizer: { type: Schema.Types.ObjectId, ref: 'users' },
});

export const Event = mongoose.models?.events || mongoose.model("events", eventSchema);