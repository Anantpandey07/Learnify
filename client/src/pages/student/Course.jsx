import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

export default function Course() {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800  bg-white shadow-lg hover:shadow-2xl">
      <div className='relative'>
        <img alt='course' className='w-full h-36 object-cover rounded-t-lg' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTqkwuaNS_ZTSpNxnSKmqLVGRFFy-jz1UkBA&s' />
      </div>
      <CardContent className="px-4 space-y-2">
        <h1 className='hover:underline font-bold text-lg truncate'>React JS Complete course</h1>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <h1 className='font-medium text-sm'>User098</h1>
          </div>
          <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">Advance</Badge>
        </div>
        <div className='text-xl font-bold'>
          <span>₹499</span>
        </div>
      </CardContent>
    </Card>
  )
}
