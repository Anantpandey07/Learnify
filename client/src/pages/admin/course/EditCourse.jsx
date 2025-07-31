import { Button } from '@/components/ui/button'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CourseTab from './courseTab'

export default function EditCourse() {
  const navigate  = useNavigate();
  return (
    <div className='flex-1'>
        <div className='flex items-center justify-between mb-5'>
            <h1 className='font-bold text-xl'>Add further information regarding course</h1>
            <Link to='lecture'>
            <Button className="hover:text-blue-700" variant="link">Go To Lecture Tab</Button>
            </Link>
        </div>
        <CourseTab/>
    </div>
  )
}
