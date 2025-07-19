import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, } from '@/components/ui/select'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function AddCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, {data, isLoading, error, isSuccess}] = useCreateCourseMutation();

  const navigate = useNavigate();
  const getCategorySelector = (val) =>{
    setCategory(val);
  }
  const createCourseHandler = async () => {
    await createCourse({courseTitle, category});
  }
  // for display toast
  useEffect(() =>{
    if(isSuccess){
      toast.success(data?.message || "Course Created Successfully");
    }
    if(error){
      toast.error(error?.message || "Some error occured")
    }
  },[isSuccess, error])
  return (
    <div className='flex-1 mx-10'>
      <div className='mb-4'>
        <h1 className='font-bold text-xl'> Lets add course, add some basic course details for your new course</h1>
        <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, exercitationem.</p>
      </div>
      <div>
        <div className='space-y-4'>
          <Label>Title</Label>
          <Input onChange={(e) => {setCourseTitle(e.target.value)}} type="text" value={courseTitle} placeholder="Your Course Name"></Input>
        </div>
        <div className='space-y-4'>
          <Label>Category</Label>
          <Select onValueChange = {getCategorySelector}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NextJs">NextJs</SelectItem>
              <SelectItem value="FrontendDeveloper">FrontendDeveloper</SelectItem>
              <SelectItem value="BackendDeveloper">BackendDeveloper</SelectItem>
              <SelectItem value="MernStack">MernStack</SelectItem>
              <SelectItem value="DSA">DSA</SelectItem>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="Docker">Docker</SelectItem>
              <SelectItem value="AI/ML">AI/ML</SelectItem>
              <SelectItem value="Prompt Engineering">Prompt Engineering</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' onClick = {() => {navigate('/admin/courses')}}>Back</Button>
          <Button disabled = {isLoading} onClick={createCourseHandler}>
            {
              isLoading ? (<><Loader2 className=' mr-2 h-4 w-4 animate-spin'/> Please Wait..</>) : 'Create'
            }
          </Button>
        </div>
      </div>
    </div>
  )
}
