import EventForm from '@/components/shared/EventForm/EventForm';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

const UpdateEventPage = () => {
    const {sessionClaims} = auth();


    const userId = sessionClaims?.userId as string;

    return (
        <div className='py-4 px-2 flex flex-col items-center'>
            <p className='text-3xl font-medium'>Update Event</p>

            <div>
                <EventForm userId={userId} type="update"/>
            </div>
        </div>
    );
};

export default UpdateEventPage;