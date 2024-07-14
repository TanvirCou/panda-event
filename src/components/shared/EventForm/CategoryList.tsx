"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ICategory } from "@/lib/models/categoryModel";
import { startTransition, useEffect, useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { createCategory, getAllCategory } from "@/lib/actions/category";

type CategoryProps = {
    value?: string;
    onChangeHandler?: () => void;
}

const CategoryList = ({ onChangeHandler, value }: CategoryProps) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [newCategory, setNewCategory] = useState("");
    console.log(value);
    
    

    const handleNewCategory = async() => {
        const category = await createCategory(newCategory)
        setCategories((prev) => [...prev, category]);
    };

    useEffect(() => {
        const getCategories = async() => {
            const allCategory = await getAllCategory();
            setCategories(allCategory)
        }

        getCategories();
    }, [])

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {
                    categories.length > 0 && categories.map(category => (
                        <SelectItem className="py-3" key={category._id} value={category._id}>{category.name}</SelectItem>
                    ))
                }

                <AlertDialog>
                    <AlertDialogTrigger className="w-full flex justify-center items-center font-medium hover:text-purple-600 hover:bg-gray-100 py-2">Add New</AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Add New Category</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input type="text" placeholder="Enter Category" className="w-full" onChange={(e) => setNewCategory(e.target.value)} value={newCategory}/>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => startTransition(handleNewCategory)}>Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </SelectContent>


        </Select>
    );
};

export default CategoryList;