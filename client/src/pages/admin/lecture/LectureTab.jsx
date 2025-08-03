import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useEditLectureMutation, useRemoveLectureMutation } from '@/features/api/courseApi'
import { Label } from '@radix-ui/react-dropdown-menu'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const MEDIA_API = "http://localhost:8000/api/v1/media";

export default function LectureTab() {

    const [lectureTitle, setLectureTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress]= useState(0);
    const [btnDisable, setBtnDisable] = useState(true);

    const params = useParams();
    const {courseId, lectureId} = params;

    const [editLecture, {data, isLoading, error, isSuccess}] = useEditLectureMutation();
    const [removeLecture, {data: removeData, isLoading:removeLoading, isSuccess: removeSuccess}] = useRemoveLectureMutation();

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if(file){
            const formData = new FormData();
            formData.append("file", file);
            setMediaProgress(true);
            try {
                const res = await axios.post(`${MEDIA_API}/upload-media`, formData, {
                    onUploadProgress: ({loaded, total}) => {
                        setUploadProgress(Math.round((loaded *100)/ total));
                    }
                });

                if(res.data.success){
                    // console.log(res);
                    setUploadVideoInfo({videoUrl : res.data.data.url, publicId: res.data.data.public_id});
                    setBtnDisable(false);
                    toast.success(res.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error("Video Upload Failed");
            } finally {
                setMediaProgress(false);
            }
        }
    }

    const editLecHandle = async () => {
        // alert("Working");
        await editLecture({lectureTitle, videoInfo:uploadVideoInfo, isPreviewFree:isFree, courseId, lectureId}) 
    }

    useEffect(() =>{
        if(isSuccess){
            toast.success(data.message);
        }
        if(error){
            toast.error(error.data.message);
        }
    }, [isSuccess, error]);

    const removeLecHandler = async () => {
        removeLecture(lectureId);
    }
    useEffect(() =>{
        if(removeSuccess){
            toast.success(removeData.message);
        }
    }, [removeSuccess]);
  return (
    <div>
        <Card className='mt-6'>
            <CardHeader className='flex justify-between'>
                <div>
                    <CardTitle>Edit Lectures</CardTitle>
                    <CardDescription>Edit here. Click save when you done</CardDescription>
                </div>
                <div className='flex items-center gap-2'>
                    <Button disable={removeLoading} variant="destructive" onClick = {removeLecHandler}>
                        {
                            (removeLoading) ? <><Loader2 className='sm animate-spin'/>Loading...</> : ("Remove Lecture")
                        }
                        </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>Title</Label>
                    <Input
                    type="text"
                    value = {lectureTitle}
                    onChange = {(e) => (setLectureTitle(e.target.value))}
                    placeholder = "Ex. Introduction to JAVA"
                    />
                </div>
                <div className='my-5'>
                    <Label>Video <span className='text-red-500'>*</span></Label>
                    <Input
                    type="file"
                    accept= "video/*"
                    onChange = {fileChangeHandler}
                    placeholder = "Ex. Introduction to JAVA"
                    className='w-fit'
                    />
                </div>
                <div className='flex items-center space-x-2 my-5'>
                    <Switch id="free-video"/>
                    <Label htmlFor = "free-video">Is this video FREE</Label>
                </div>
                {
                    mediaProgress && (
                        <div className='my-4'>
                            <Progress value={uploadProgress}/>
                            <p>{uploadProgress}% uploaded</p>
                        </div>
                    )
                }
                <div className='mt-4'>
                    <Button onClick = {editLecHandle}>Update Lecture</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
