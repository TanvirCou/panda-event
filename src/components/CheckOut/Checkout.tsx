"use client"
import { IEvent } from '@/lib/models/eventModel';
import React from 'react';
import { Button } from '../ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type CheckoutProps = {
    event: IEvent;
    userId: string
} 

const Checkout = ({event, userId}: CheckoutProps) => {

    React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

    const handleCheckout = async() => {
        const order = {
            eventTitle: event.title,
            eventId: event._id,
            price: event.price,
            isFree: event.isFree,
            buyerId: userId
        };

        await checkoutOrder(order);
    }

    return (
        <form onSubmit={handleCheckout}>
            <Button type='submit' role='link' className='bg-purple-600'>
                {event.isFree ? "Get Ticket" : "Buy Ticket"}
            </Button>
        </form>
    );
};

export default Checkout;