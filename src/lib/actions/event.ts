"use server"

import { CreateEventParams, DeleteEventParams, GetAllEventsParams, GetEventsByUserParams, GetRelatedEventsByCategoryParams, UpdateEventParams } from "@/types";
import { Event } from "../models/eventModel"
import { connectToDb } from "../services/mongo"
import { User } from "../models/userModel";
import Category from "../models/categoryModel";
import { revalidatePath } from "next/cache";

const populateEvent = (query: any) => {
    return query
      .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
      .populate({ path: 'category', model: Category, select: '_id name' })
  }

  const getCategoryByName = async (name: string) => {
    return Category.findOne({ name: { $regex: name, $options: 'i' } })
  }

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

export async function getAllEvents({ query, limit = 6, page, category }: GetAllEventsParams) {
    try {
        await connectToDb();
  
      const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
      const categoryCondition = category ? await getCategoryByName(category) : null
      const conditions = {
        $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
      }
  
      const skipAmount = (Number(page) - 1) * limit
      const eventsQuery = Event.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const events = await populateEvent(eventsQuery)
      const eventsCount = await Event.countDocuments(conditions)
  
      return {
        data: JSON.parse(JSON.stringify(events)),
        totalPages: Math.ceil(eventsCount / limit),
      }
    } catch (error) {
      console.log(error)
    }
  }

export const getEventById = async(id: string) => {
    try {
        

        const event = await populateEvent(Event.findById(id));

        if (!event) throw new Error('Event not found');
        
        return JSON.parse(JSON.stringify(event)); 
    } catch (error) {
        console.log(error);
        
    }
}

// DELETE
export async function deleteEvent({ eventId, path }: DeleteEventParams) {
    try {
        await connectToDb();
  
      const deletedEvent = await Event.findByIdAndDelete(eventId)
      if (deletedEvent) revalidatePath(path)
    } catch (error) {
      console.log(error)
    }
  }

// UPDATE
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    await connectToDb();

    const eventToUpdate = await Event.findById(event._id)
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or event not found')
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.category },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedEvent))
  } catch (error) {
    console.log(error)
  }
}

// GET EVENTS BY ORGANIZER
export async function getEventsByUser({ userId, limit = 6, page }: GetEventsByUserParams) {
  try {
    await connectToDb();

    const conditions = { organizer: userId }
    const skipAmount = (page - 1) * limit

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    console.log(error)
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    await connectToDb();

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    console.log(error)
  }
}
  