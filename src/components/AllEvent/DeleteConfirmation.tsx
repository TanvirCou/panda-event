"use client"
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
import deleteIcon from "../../../public/assets/icons/delete.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { deleteEvent } from "@/lib/actions/event";

type IdProps = {
    eventId: string
}

const DeleteConfirmation = ({eventId}: IdProps) => {
    const [isPending, startTransition] = useTransition();
    const pathName = usePathname();

    const handleDelete = async() => {
        await deleteEvent({eventId: eventId, path: pathName})
    }
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger className='bg-gray-100 p-3 rounded-xl mt-3'>
                    <Image src={deleteIcon} alt='' width={20} height={20} className='cursor-pointer' />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you want to delete this event?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this event
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => startTransition(handleDelete)}>{isPending ? "Deleting..." : "Delete"}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
};

export default DeleteConfirmation;