import { formatDateTime } from '@/app/(root)/events/[id]/page';
import { IEvent } from '@/lib/models/eventModel';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import updateIcon from "../../../public/assets/icons/edit.svg";
import DeleteConfirmation from './DeleteConfirmation';
import arrowIcon from "../../../public/assets/icons/arrow.svg";

type CardProps = {
    event: IEvent;
    hasOrderLink?: boolean;
    hidePrice?: boolean
}

const Card = async ({ event, hasOrderLink, hidePrice }: CardProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId;

    const isEventOrganizer = userId === event.organizer?._id;




    return (
        <div className='w-full border bg-white hover:bg-purple-50 shadow-md py-4'>
            <div className='w-full h-40 relative'>
                <Image src={event.imageUrl} alt={event.title} className='object-contain' fill priority={true} />

                {
                    isEventOrganizer && !hidePrice &&
                    <div className='absolute right-2 top-2'>
                        <div className='bg-gray-100 p-3 rounded-xl'>
                            <Link href={`events/${event._id}/update-event`} className='bg-red-500 '>
                                <Image src={updateIcon} alt='' width={20} height={20} className='cursor-pointer' />
                            </Link>
                        </div>

                        <DeleteConfirmation eventId={event._id} />
                    </div>
                }
            </div>
            <div className='flex flex-col px-8 my-2'>
                <Link href={`events/${event._id}`}>
                    <div className='flex items-center gap-x-6'>
                        <p className='px-4 py-1.5 bg-purple-600/5 rounded-full text-lg text-purple-600 italic'>{event.isFree ? "Free" : `$ ${event.price}`}</p>
                        <p className="px-4 py-1.5 bg-gray-600/5 rounded-full">{event.category.name}</p>
                    </div>

                    <p className='text-sm'>{formatDateTime(event.startDateTime).dateTime}</p>



                    <p className='text-lg font-semibold'>{event.title}</p>

                    <div className='flex items-center justify-between'>
                        <p className='text-sm'>By {` `} <span className='font-medium text-sm'>{event.organizer?.firstName}  {event.organizer?.lastName}</span></p>


                        {
                            hasOrderLink &&
                            <Link href={`/orders?eventId=${event._id}`}>
                                <div className='flex items-center gap-x-2'>
                                    <p className='text-sm text-blue-600'>Order Details</p>
                                    <Image src={arrowIcon} width={10} height={10} alt='' />
                                </div>
                            </Link>
                        }
                    </div>
                </Link>
            </div>

            <div>
            </div>
        </div>
    );
};

export default Card;