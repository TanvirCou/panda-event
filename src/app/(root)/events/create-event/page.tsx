import EventForm from '@/components/shared/EventForm/EventForm';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

const CreateEventPage = () => {
    const {sessionClaims} = auth();
    

    const userId = sessionClaims?.userId as string;

    return (
        <div className='py-4 px-2 flex flex-col items-center'>
            <p className='text-2xl font-medium'>Create Event</p>

            <div className='w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] mt-4'>
                <EventForm userId={userId} type="Create"/>
            </div>
        </div>
    );
};

export default CreateEventPage;