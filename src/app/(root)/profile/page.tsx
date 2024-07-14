import AllEvent from '@/components/AllEvent/AllEvent';
import { Button } from '@/components/ui/button';
import { getEventsByUser } from '@/lib/actions/event';
import { getOrdersByUser } from '@/lib/actions/order';
import { SearchParamProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react';

const page = async({searchParams}: SearchParamProps) => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;

    const orderPages = Number(searchParams?.orderPages) || 1;
    const eventPages = Number(searchParams?.eventPages) || 1;

    const orders = await getOrdersByUser({userId, limit: 3, page: orderPages});
    console.log(orders);
    

    const organizedEvents = await getEventsByUser({userId, limit: 3, page: eventPages});

    return (
        <div>
            <div className='my-8 px-6 md:px-2 lg:px-24 xl:px-32'>
                <div className='flex items-center justify-between'>
                    <p className='text-2xl font-medium '>My Ticket</p>
                    <Button className='hidden md:block bg-purple-600'>
                        <Link href="/#events">Explore more</Link>
                    </Button>
                </div>

                <AllEvent
                    data={[]}
                    emptyTitle="No event tickets purchased yet"
                    emptyStateSubtext="No worries - plenty of exciting events to explore!"
                    collectionType="My_Ticket"
                    limit={3}
                    page={orderPages}
                    urlParamName='ordersPage'
                    totalPages={2}
                />
            </div>

            <div className='my-8 px-6 md:px-2 lg:px-24 xl:px-32'>
                <div className='flex items-center justify-between'>
                    <p className='text-2xl font-medium '>Event Organized</p>
                    <Button className='hidden md:block bg-purple-600'>
                        <Link href="/events/create-event">Create More Event</Link>
                    </Button>
                </div>

                <AllEvent
                    data={organizedEvents?.data}
                    emptyTitle="No events have been created yet"
                    emptyStateSubtext="Go create some now"
                    collectionType="Event_Organized"
                    limit={3}
                    page={eventPages}
                    urlParamName='eventsPage'
                    totalPages={organizedEvents?.totalPages}
                />
            </div>
        </div>
    );
};

export default page;