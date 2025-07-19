import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className='flex'>
            <div className='hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-r-gray-400 dark:border-gray-700 bg-[#f0f0f0] p-5 sticky top-0 h-screen'>
                <div className='space-y-6 mt-15'>
                    <Link to="/admin/dashboard" className='flex items-center gap-2'>
                        <ChartNoAxesColumn size={22} />
                        <h1>DashBoard</h1>
                    </Link>
                    <Link to="/admin/courses" className='flex items-center gap-2'>
                        <SquareLibrary size={22} />
                        <h1>Courses</h1>
                    </Link>
                </div>
            </div>
            <div className='flex-1 p-20 md:p-24 bg-white'>
                <Outlet />
            </div>
        </div>
    )
}
