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
  