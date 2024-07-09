'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation'

const NavLink = () => {
    const pathname = usePathname();
    
    const links = [{ label: "Home", url: "/" }, { label: "Events", url: "/events" }, { label: "My Profile", url: "/profile" }]
    return (
        <div className='flex flex-col md:flex-row h-full justify-center items-center text-md gap-y-6 md:gap-x-8 font-medium'>
            {
                links.map(link => (
                    <Link key={link.label} href={link.url} className={`${link.url === pathname ? "text-purple-600" : "text-black"}`}>{link.label}</Link>
                ))
            }
        </div>
    );
};

export default NavLink;