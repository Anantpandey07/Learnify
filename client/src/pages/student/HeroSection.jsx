import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react'

const HeroSection = () => {
    return (
        <div className='relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-25 px-5'>
            <div className='max-w-xl mx-auto'>
                    <h1 className='flex justify-center text-white text-4xl font-bold mb-4'>Fuel Your Future with Learning</h1>
                    <p className='flex justify-center text-gray-300 dark:text-gray-500 mb-4'>Dive into courses that drive growth and success.</p>
                    <form className='flex'>
                        <Input placeholder="Search courses" type="text" className="flex-grow bg-white border-none focus-visible:ring-0 px-6 py-3 dark:text-gray-100 rounded-s-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"/>
                        <Button className="rounded-e-full bg-blue-500 dark:bg-gray-400 hover:bg-blue-700 dark:hover:bg-blue-900">Search</Button>
                    </form>
                    <div className='flex justify-center'>
                        <Button className=" text-black bg-white dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-blue-900">Explore Courses</Button>
                    </div>
            </div>
        </div>
    )
}

export default HeroSection;
