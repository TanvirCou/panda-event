import React from 'react';

const Footer = () => {
    const date: number = new Date().getFullYear();
    return (
        <div className='w-full h-16 flex justify-around items-center'>
            <p className='text-lg font-bold text-purple-600 font-[Poppins]'>Panda-Event</p>
            <p className='text-sm'>All rights reserved, {date}</p>
        </div>
    );
};

export default Footer;