import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import NavLink from './NavLink';
import MobileBar from './MobileBar';

const Navbar = () => {
    return (
        <div className='h-16 w-full border-b'>
            <div className='flex items-center justify-between px-6 md:px-12 lg:px-24 xl:px-32 h-full'>

                <Link href="/" className='text-2xl font-bold font-[Poppins] text-purple-600'>Panda-Event</Link>

                <div className='hidden md:block'>
                    <NavLink />
                </div>


                <div className='flex items-center gap-x-3'>
                    <SignedIn>
                        <UserButton afterSignOutUrl='/' />
                    </SignedIn>
                    <SignedOut>
                        <Button className='rounded-full bg-purple-600' size="default">
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    </SignedOut>

                    <div className='block md:hidden'>
                        <MobileBar />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;