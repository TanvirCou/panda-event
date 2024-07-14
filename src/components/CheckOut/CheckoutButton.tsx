import { IEvent } from '@/lib/models/eventModel';
import { SignedIn, SignedOut, } from '@clerk/nextjs';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Checkout from './Checkout';
import { auth } from '@clerk/nextjs/server';

type CheckoutButtonProps = {
    event: IEvent
}

const CheckoutButton = ({event}: CheckoutButtonProps) => {
    const isEventFinished = new Date(event.endDateTime) < new Date();

    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <div>
            {
                isEventFinished ? 
                <p className='text-md font-medium'>This Event are no longer available</p> :
                (
                    <div>
                        <SignedOut>
                            <Button className='bg-purple-600'>
                                <Link href="/sign-in">
                                    Get Ticket
                                </Link>
                            </Button>
                        </SignedOut>

                        <SignedIn>
                            <Checkout event={event} userId={userId}/>
                        </SignedIn>
                    </div>
                )
            }
        </div>
    );
};

export default CheckoutButton;