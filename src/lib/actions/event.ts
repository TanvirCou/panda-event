"use server"

import { CreateEventParams } from "@/types";
import { Event } from "../models/eventModel"
import { connectToDb } from "../services/mongo"

export const createEvent = async(event: CreateEventParams) => {
    try {
        await connectToDb();

        const newEvent = await Event.create(event);
        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        console.log(error);
        
    }
}

export const getEvents = async() => {
    try {
        await connectToDb();

        const events = await Event.find({});
        return JSON.parse(JSON.stringify(events)); 
    } catch (error) {
        console.log(error);
        
    }
}

export const getEventById = async(id: string) => {
    try {
        await connectToDb();

        const event = await Event.findById(id)
        return JSON.parse(JSON.stringify(event)); 
    } catch (error) {
        console.log(error);
        
    }
}