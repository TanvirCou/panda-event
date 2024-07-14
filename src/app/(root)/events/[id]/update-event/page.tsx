import EventForm from '@/components/shared/EventForm/EventForm';
import { getEventById } from '@/lib/actions/event';
import { IEvent } from '@/lib/models/eventModel';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }

const UpdateEventPage = async({ params: { id }, searchParams }: SearchParamProps) => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;

    const event: IEvent = await getEventById(id);
    

    const eventId: string = event._id.toString();
    


    return (
        <div className='py-4 px-2 flex flex-col items-center'>
            <p className='text-3xl font-medium'>Update Event</p>

            <div className='w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] mt-4'>
                <EventForm userId={userId} type="Update" event={event} eventId={eventId}/>
            </div>
        </div>
    );
};

export default UpdateEventPage;