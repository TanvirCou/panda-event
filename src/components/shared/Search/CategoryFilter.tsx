"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useEffect, useState } from 'react';
import { formUrlQuery, removeKeysFromQuery } from './Search';
import { ICategory } from '@/lib/models/categoryModel';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllCategory } from '@/lib/actions/category';

const CategoryFilter = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategory();

            categoryList && setCategories(categoryList as ICategory[])
        }

        getCategories();
    }, [])

    const onSelectCategory = (category: string) => {
        let newUrl = '';

        if (category && category !== 'All') {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'category',
                value: category
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['category']
            })
        }

        router.push(newUrl, { scroll: false });
    }

    return (
            <Select onValueChange={(value: string) => onSelectCategory(value)}>
            <SelectTrigger className="rounded-md border border-purple-600">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All" className="py-2">All</SelectItem>

                {categories.map((category) => (
                    <SelectItem value={category.name} key={category._id} className="py-2">
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default CategoryFilter;