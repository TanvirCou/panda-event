"use server"

import Category from "../models/categoryModel";
import { connectToDb } from "../services/mongo"

export const createCategory = async(categoryName: string) => {
    try {
        await connectToDb();

        const newCategory = await Category.create({name: categoryName});
        return JSON.parse(JSON.stringify(newCategory));
    } catch (error) {
        console.error(error)
        throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
    }
} 

export const getAllCategory = async() => {
    try {
        await connectToDb();

        const allCategory = await Category.find({});
        return JSON.parse(JSON.stringify(allCategory));
    } catch (error) {
        console.error(error)
        throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
    }
} 