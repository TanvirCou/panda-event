"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CategoryList from "./CategoryList"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "./FileUploader"
import { useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox";

import locationIcon from "../../../../public/assets/icons/location-grey.svg";
import calendarIcon from "../../../../public/assets/icons/calendar.svg";
import dollarIcon from "../../../../public/assets/icons/dollar.svg";
import linkIcon from "../../../../public/assets/icons/link.svg";
import { useUploadThing } from "@/lib/uploadthing"
import { createEvent } from "@/lib/actions/event"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    title: z.string().min(3, { message: "Username must be at least 3 characters." }),
    description: z.string().min(3, { message: "Description must be at least 3 characters." }).max(400, { message: "Description must be less than 400 characters." }),
    location: z.string().min(3, { message: "Location must be at least 3 characters." }).max(400, { message: "Location must be less than 400 characters." }),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url(),
    categoryId: z.string(),
})

type EventFormProps = {
    userId: string;
    type: string;
}

const EventForm = ({ userId, type }: EventFormProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            imageUrl: "",
            startDateTime: new Date(),
            endDateTime: new Date(),
            price: "",
            isFree: false,
            url: "",
            categoryId: "",
        },
    });

    const { startUpload } = useUploadThing("imageUploader");
    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            let uploadImageUrl;

        if(files.length > 0) {
            const uploadImages = await startUpload(files);

            if(!uploadImages) {
                return;
            }

            uploadImageUrl = uploadImages[0].url   
        }

        
        const event = {
            title: values.title,
            description: values.description,
            location: values.location,
            imageUrl: uploadImageUrl,
            startDateTime: values.startDateTime,
            endDateTime: values.endDateTime,
            price: values.price,
            isFree: values.isFree,
            url: values.url,
            category: values.categoryId,
            organizer: userId
        }
            const res = await createEvent(event);

            if(!!res) {
                form.reset();
                router.push(`/events/${res._id}`);
            }

        } catch (error) {
            console.log(error);
            
        }      
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Enter Event Title" {...field} className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <CategoryList onChangeHandler={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Enter Event Description" {...field} className="w-full h-32" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <FileUploader onChangeHandler={field.onChange} imageUrl={field.value} setFiles={setFiles} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex justify-end items-center bg-white border rounded-md">


                                        <Input placeholder="Enter Event Location" {...field} className="w-full relative" />
                                        <Image src={locationIcon} width={20} height={20} alt="" className="absolute mr-2" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex justify-between items-center h-10 bg-white border rounded-md px-1">
                                        <div className="flex items-center gap-x-1">
                                            <Image src={calendarIcon} width={24} height={24} alt="" />
                                            <p className="font-medium">Select a Start Date & Time</p>
                                        </div>
                                        <DatePicker minDate={new Date()} dateFormat="MMMM d, yyyy h:mm aa" placeholderText="Click to select a date" showTimeSelect selected={field.value} onChange={(date) => field.onChange(date)} className="h-8 px-2 border border-purple-600 rounded-md" />

                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex justify-between items-center h-10 bg-white border rounded-md px-1">
                                        <div className="flex items-center gap-x-1">
                                            <Image src={calendarIcon} width={24} height={24} alt="" className="" />
                                            <p className="font-medium">Select a End Date & Time</p>
                                        </div>
                                        <DatePicker minDate={new Date()} dateFormat="MMMM d, yyyy h:mm aa" placeholderText="Click to select a date" showTimeSelect selected={field.value} onChange={(date) => field.onChange(date)} className="h-8 px-2 border border-purple-600 rounded-md" />

                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-between items-center w-full">
                        <div className="w-[50%]">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex justify-end items-center bg-white border rounded-md w-full">
                                            <Input type="number" placeholder="Enter Event Price" {...field} className="w-full relative" />
                                            <Image src={dollarIcon} width={20} height={20} alt="" className="absolute" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>

                        <div className="w-fit">
                        <FormField
                            control={form.control}
                            name="isFree"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex justify-end items-center gap-x-2 px-4 bg-white h-10 border rounded-md w-full">
                                            <label htmlFor="isFree" className="text-sm font-medium">Is Free</label>
                                            <Checkbox id="isFree" className="border-purple-600 checked:bg-purple-600" checked={field.value} onCheckedChange={field.onChange}/>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>
                        
                    </div>

                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex justify-end items-center bg-white border rounded-md">


                                        <Input placeholder="Enter Event Url" {...field} className="w-full relative" />
                                        <Image src={linkIcon} width={20} height={20} alt="" className="absolute mr-2" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>


                <Button type="submit" disabled={form.formState.isSubmitting} className="bg-purple-600">{form.formState.isSubmitting ? "Submitting..." : `${type} Event`}</Button>
            </form>
        </Form>
    );
};

export default EventForm;