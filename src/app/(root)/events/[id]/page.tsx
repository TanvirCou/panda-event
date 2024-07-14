import { getAllEvents, getEventById, getRelatedEventsByCategory } from '@/lib/actions/event';
import Image from 'next/image';
import calendarIcon from "../../../../../public/assets/icons/calendar.svg";
import locationIcon from "../../../../../public/assets/icons/location.svg";
import { Button } from '@/components/ui/button';
import AllEvent from '@/components/AllEvent/AllEvent';
import { IEvent } from '@/lib/models/eventModel';
import CheckoutButton from '@/components/CheckOut/CheckoutButton';

type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }

  export const formatDateTime = (dateString: Date) => {
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
      month: 'short', // abbreviated month name (e.g., 'Oct')
      day: 'numeric', // numeric day of the month (e.g., '25')
      hour: 'numeric', // numeric hour (e.g., '8')
      minute: 'numeric', // numeric minute (e.g., '30')
      hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    }
  
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
      month: 'short', // abbreviated month name (e.g., 'Oct')
      year: 'numeric', // numeric year (e.g., '2023')
      day: 'numeric', // numeric day of the month (e.g., '25')
    }
  
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric', // numeric hour (e.g., '8')
      minute: 'numeric', // numeric minute (e.g., '30')
      hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    }
  
    const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions)
  
    const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions)
  
    const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions)
  
    return {
      dateTime: formattedDateTime,
      dateOnly: formattedDate,
      timeOnly: formattedTime,
    }
  }
  
const page = async({ params: { id }, searchParams }: SearchParamProps) => {
    const event: IEvent = await getEventById(id);

    const relatedPages = Number(searchParams?.page) || 1;

    const relatedEvents = await getRelatedEventsByCategory({
      categoryId: event.category._id,
      eventId: id,
      limit: 3,
      page: 1,
    })

    // const events = await getAllEvents({query: "", category: event.category.name, limit: 6, page: 1}); 

    // const relatedEvents: IEvent[] = events?.data.filter((i: IEvent) => i._id !== id);
  
    return (
      <div>
        <div className='block md:flex my-4 px-6 md:px-2 lg:px-24 xl:px-32'>
            <div className='w-full md:w-[50%] flex justify-center items-center p-8'>
                <Image src={event.imageUrl} width={500} height={500} alt='' className='object-contain'/>
              
            </div>

            <div className='w-full md:w-[50%] flex flex-col gap-y-4 justify-center px-8'>
                <p className='text-2xl font-medium'>{event.title}</p>

                <div className='flex items-center gap-x-6'>
                    <p className='px-4 py-1.5 bg-purple-600/5 rounded-full text-xl italic'>{event.isFree ? "Free" : `$ ${event.price}`}</p>
                    <p className="px-4 py-1.5 bg-gray-600/5 rounded-full">{event.category.name}</p>
                </div>

                <p >By {` `} <span className='font-medium text-lg'>{event.organizer?.firstName}  {event.organizer?.lastName}</span></p>

                <CheckoutButton event={event}/>

                <div className='flex items-center gap-x-2'>
                    <Image src={calendarIcon} width={30} height={30} alt='' />
                    <p>{formatDateTime(event.startDateTime).dateTime} - {formatDateTime(event.endDateTime).dateTime}</p>
                </div>

                <div className='flex items-center gap-x-2'>
                    <Image src={locationIcon} width={30} height={30} alt='' />
                    <p>{event.location}</p>
                </div>

                <div className='flex flex-col gap-y-1'>
                    <p className='text-sm'>What You will learn:</p>
                    <p className='text-sm text-gray-400'>{event.description}</p>
                </div>

                <p className='font-medium text-blue-600 underline'>{event.url}</p>
                
            </div>
        </div>


        <div className='my-8 px-6 md:px-2 lg:px-24 xl:px-32'>
            <p className='text-2xl font-medium '>Related Event</p>

            <AllEvent
          data={relatedEvents?.data}
          emptyTitle="No Related Event Found"
          emptyStateSubtext="This product doesn't have any related products"
          collectionType="All_Event"
          limit={3}
          page={relatedPages}
          totalPages={relatedEvents?.totalPages}
        />
        </div>

      </div>
    );
};

export default page;