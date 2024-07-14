import { IEvent } from '@/lib/models/eventModel';
import React from 'react';
import Card from './Card';
import Pagination from '../shared/Search/Pagination';

type CollectionProps = {
    data: IEvent[];
    emptyTitle: string;
    emptyStateSubtext: string;
    collectionType?: "Event_Organized" | "All_Event" | "My_Ticket";
    limit: number;
    page: number | string;
    totalPages?: number;
    urlParamName?: string
}

const AllEvent = ({ data, emptyTitle, emptyStateSubtext, collectionType, limit, page, totalPages = 0, urlParamName }: CollectionProps) => {
    return (
        <div className="my-8 flex flex-col">
            
            {
                data.length > 0 ? (
                    <div className='flex flex-col gap-8'>
                    <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                        {
                            data.map(event => {
                                const hasOrderLink = collectionType === "Event_Organized";
                                const hidePrice = collectionType === "My_Ticket";

                                return (
                                    <div key={event._id}>
                                        <Card event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                                    </div>
                                )
                            })
                        }
                    </div>

                        {totalPages > 1 && (
                            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
                        )}
                    </div>
                ) : (
                    <div className='h-[30vh] w-full flex flex-col justify-center items-center bg-white'>
                        <p className='text-xl font-medium'>{emptyTitle}</p>
                        <p className='font-medium'>{emptyStateSubtext}</p>
                    </div>
                )
            }
        </div>
    );
};

export default AllEvent;