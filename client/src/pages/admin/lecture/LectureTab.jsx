import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@radix-ui/react-dropdown-menu'
import React from 'react'

export default function LectureTab() {
  return (
    <div>
        <Card className='mt-6'>
            <CardHeader className='flex justify-between'>
                <div>
                    <CardTitle>Edit Lectures</CardTitle>
                    <CardDescription>Edit here. Click save when you done</CardDescription>
                </div>
                <div className='flex items-center gap-2'>
                    <Button variant="destructive">Remove Lecture</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>Title</Label>
                    <Input
                    type="text"
                    placeholder = "Ex. Introduction to JAVA"
                    />
                </div>
                <div className='my-5'>
                    <Label>Video <span className='text-red-500'>*</span></Label>
                    <Input
                    type="file"
                    accept= "video/*"
                    placeholder = "Ex. Introduction to JAVA"
                    className='w-fit'
                    />
                </div>
                <div className='flex items-center space-x-2 my-5'>
                    <Switch id="free-video"/>
                    <Label htmlFor = "free-video">Is this video FREE</Label>
                </div>
                <div className='mt-4'>
                    <Button>Update Lecture</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
