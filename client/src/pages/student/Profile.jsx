import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    Dialog, DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Course from './Course'
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'


export default function Profile() {
    const [name, setName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");

    const { data, isLoading, error, refetch} = useLoadUserQuery(); // refetch is used to fetch data again to show updated data on profile page 
    const [updateUser, { data: updateUserData, isLoading: updateUserisLoading, error:updateUserError, isSuccess , isError}] = useUpdateUserMutation();
    // console.log("data:", data);
    // console.log("error:", error);
    const onChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePhoto(file);
        }
    }
    // console.log(data);
    // const isLoading = false;

    const updateUserHandler = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("profilePhoto", profilePhoto);
        await updateUser(formData);
    }

    useEffect(() => {
        if(isSuccess){
            refetch(); // after updation it refetches the data on profile page
            toast.success(data.message || "Profile Updated")
        }
        if(isError){
            toast.error(updateUserError.message || "Some error Occured")
        }
    }, [updateUserData, updateUserError, isSuccess, isError])

    if (isLoading) {
        return <h1 className='my-30 mx-30 font-bold'>Page is Loading..</h1>
    }
    if (!data || !data.user) {
        return <h1 className='my-30 mx-30 font-bold text-red-600'>User data not found Or Maybe you are not Authenticated</h1>;
    }
    const user = data && data.user;
    return (
        <div className='max-w-5xl mx-auto px-4 my-24'>
            <h1 className='font-bold text-2xl text-center md:text-left'>Profile</h1>
            <div className='flex flex-col md:flex-row items-center md:items-start gap-8 my-5'>
                <div className='flex flex-col items-center'>
                    <Avatar className="h-24 w-24 md:h-34 md:w-34 mb-4">
                        <AvatarImage
                            src={user.photoURL || "https://github.com/evilrabbit.png"}
                            alt="@evilrabbit"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div className='mb-2'>
                        <h2 className='font-semibold text-gray-900 dark:text-gray-200 '>
                            Name : <span className='font-normal text-gray-50-700 dark:text-gray-50 ml-2'>{user?.name}</span>
                        </h2>
                    </div>
                    <div className='mb-2'>
                        <h2 className='font-semibold text-gray-900 dark:text-gray-200 '>
                            Email : <span className='font-normal text-gray-50-700 dark:text-gray-50 ml-2'>{user?.email}</span>
                        </h2>
                    </div>
                    <div className='mb-2'>
                        <h2 className='font-semibold text-gray-900 dark:text-gray-200 '>
                            Role : <span className='font-normal text-gray-50-700 dark:text-gray-50 ml-2'>{user?.role.toUpperCase()}</span>
                        </h2>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild><Button className="bg-blue-600 mt-3">Edit Profile</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you are
                                    done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label>Name :</Label>
                                    <Input
                                        type="text"
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        placeholder='Your Name'
                                        className="col-span-3"
                                    ></Input>
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label>Profile photo :</Label>
                                    <Input onChange={onChangeHandler} type="file" accept="image/*" className="col-span-3"></Input>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={updateUserHandler} className="bg-blue-600" disabled={updateUserisLoading}>
                                    {
                                        updateUserisLoading ? (<><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait..</>) : "Save Changes"
                                    }
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div>
                <h1 className='font-medium text-lg'>Courses You are Enrolled In</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
                    {
                        user?.enrolledCourses.length == 0 ? (<h1 className='text-sm'>You have not enrolled in any courses</h1>) : (user?.enrolledCourses.map((c) => <Course course={c} key={c._id} />))
                    }
                </div>
            </div>
        </div>
    )
}
