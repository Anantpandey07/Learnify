import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '@/features/api/courseApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function CourseTab() {
    const isPublished = true;
    const navigate = useNavigate();
    const params = useParams();
    const courseId = params.courseId;
    const [editCourse, data, isLoading, isSuccess, error] = useEditCourseMutation();
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
    });
    const [publishCourse, {}] = usePublishCourseMutation();
    const { data: courseByIdData, isLoading: courseByIdLoading, refetch} = useGetCourseByIdQuery(courseId);
    useEffect(() => {
        if (courseByIdData?.course) {
            const course = courseByIdData?.course;
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: "",
            })
        }
    }, [courseByIdData])

    const [preview, setPreview] = useState("");
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }
    const selectCategory = (value) => {
        setInput({ ...input, category: value })
    }
    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value })
    }
    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreview(fileReader.result);
            fileReader.readAsDataURL(file);

        }
    }
    const updateCourseHandler = async () => {
        // console.log(input);
        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle);
        formData.append("subTitle", input.subTitle);
        formData.append("description", input.description);
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        formData.append("coursePrice", input.coursePrice);
        formData.append("courseThumbnail", input.courseThumbnail);
        await editCourse({ formData, courseId });
    }

    const publishStatusHandler = async(action) => {
        try {
            const res = await publishCourse({courseId, query:action});
            if(res.data){
                refetch();
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error("Failed to publish or unpublish course");
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Course Updated Successfully !!")
        }
        if (error) {
            toast.error(error.data.message || "Failed to update")
        }
    }, [isSuccess, error])

    if(courseByIdLoading) return <><Loader2 className='h-4 w-4 animate-spin'/> Loading..</> 
    return (
        <Card>
            <CardHeader className='flex justify-between'>
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>
                        Make Changes to your courses here. Click save to update information;
                    </CardDescription>
                </div>
                <div className='flex space-x-2'>
                    <Button disabled={courseByIdData?.course.lectures.length === 0} variant='outline' onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}>
                        {
                            courseByIdData?.course.isPublished ? ("UnPublish") : ("Publish")
                        }
                    </Button>
                    <Button>
                        Remove Course
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className='space-y-4 mt-5'>
                    <div>
                        <Label>Title</Label>
                        <Input
                            type="text"
                            name="courseTitle"
                            value={input.courseTitle}
                            onChange={changeEventHandler}
                            placeholder="Ex. DevOps Course"
                        />
                    </div>
                    <div>
                        <Label>Subtitle</Label>
                        <Input
                            type="text"
                            name="subTitle"
                            value={input.subTitle}
                            onChange={changeEventHandler}
                            placeholder="Further Explaination regarding course, If any."
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <RichTextEditor input={input} setInput={setInput} />
                    </div>
                    <div className='flex items-center gap-5'>
                        <div>
                            <Label>Category</Label>
                            <Select onValueChange={selectCategory}>
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
                        <div>
                            <Label>Course Level</Label>
                            <Select onValueChange={selectCourseLevel}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Course Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Price</Label>
                            <Input
                                type="number"
                                name="coursePrice"
                                value={input.coursePrice}
                                onChange={changeEventHandler}
                                placeholder="MRP"
                                className="w-fit"
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Course Thumbnail</Label>
                        <Input
                            type="file"
                            onChange={selectThumbnail}
                            accept="image/"
                            className="w-fit"
                        />
                        {
                            preview && (
                                <img src={preview} className='e-64 my-2' alt="Course Thumbnail"></img>
                            )
                        }
                    </div>
                    <div>
                        <Button onClick={() => { navigate("/admin/courses") }} variant="outline">Cancel</Button>
                        <Button onClick={updateCourseHandler} disabled={isLoading}>
                            {
                                isLoading ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2>
                                        Please Wait..
                                    </>
                                ) : "Save"
                            }
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
