import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLectureCreateMutation } from '@/features/api/courseApi'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function CreateLecture() {
    const params = useParams();
    const courseId = params.courseId;
    const [lectureTitle, setLectureTitle] = useState("");
    const navigate = useNavigate();
    const [lectureCreate, {data, isSuccess, isLoading, error}] = useLectureCreateMutation();

    const createLectureHandler = async () => {
        await lectureCreate ({lectureTitle, courseId})
    };

    useEffect(() => {
        if(isSuccess){
            toast.success(data.message);
        }
        if(error){
            toast.error(error.data.message);
        }
    }, [isSuccess, error])

    return (
        <div className='flex-1 mx-10'>
            <div className='mb-4'>
                <h1 className='font-bold text-xl'> Lets add lecture, add some basic lecture details for your new lecture</h1>
                <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, exercitationem.</p>
            </div>
            <div>
                <div className='space-y-4'>
                    <Label>Title</Label>
                    <Input onChange={(e) => { setLectureTitle(e.target.value) }} type="text" value={lectureTitle} placeholder="Your Lecture Title Name"></Input>
                </div>
                <div className='flex items-center gap-2'>
                    <Button variant='outline' onClick={() => { navigate(`/admin/courses/${courseId}`) }}>Back</Button>
                    <Button disabled={isLoading} onClick={createLectureHandler}>
                        {
                            isLoading ? (<><Loader2 className=' mr-2 h-4 w-4 animate-spin' /> Please Wait..</>) : 'Create'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}
