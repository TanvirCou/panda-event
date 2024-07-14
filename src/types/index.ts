export type CreateUserParams = {
    clerkId: string
    firstName: string | null
    lastName: string | null
    email: string
    photo: string
  }
  
  export type UpdateUserParams = {
    firstName: string | null
    lastName: string | null
    photo: string
  }

  export type CreateEventParams = {
    title: string;
    description: string;
    location: string;
    imageUrl?: string;
    startDateTime: Date;
    endDateTime: Date;
    price?: string;
    isFree: boolean;
    url: string;
    category: string
    organizer: string 
  }

  export type GetAllEventsParams = {
    query: string
    category: string
    limit: number
    page: number
  }

  export type DeleteEventParams = {
    eventId: string
    path: string
  }

  export type UpdateEventParams = {
    userId: string
    event: {
      _id: string
      title: string
      imageUrl?: string
      description: string
      location: string
      startDateTime: Date
      endDateTime: Date
      category: string
      price: string
      isFree: boolean
      url: string
    }
    path: string
  }

  export type GetEventsByUserParams = {
    userId: string
    limit?: number
    page: number
  }
  
  export type GetRelatedEventsByCategoryParams = {
    categoryId: string
    eventId: string
    limit?: number
    page: number | string
  }

  export type CheckoutOrderParams = {
    eventTitle: string
    eventId: string
    price: string
    isFree: boolean
    buyerId: string
  }
  
  export type CreateOrderParams = {
    stripeId: string
    eventId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
  }

  export type GetOrdersByEventParams = {
    eventId: string
    searchString: string
  }
  
  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }

  // ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

  
  