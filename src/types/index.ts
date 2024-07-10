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

  
  