import React, { useEffect } from "react";
import { School } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import { Link, useNavigate } from "react-router-dom";
import { useLogOutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const [logoutUser, { data, isSuccess }] = useLogOutUserMutation();
    const logOutHandler = async () => {
        await logoutUser();
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "LogOut Successfully!!")
            navigate("/login");
        }
    }, [isSuccess])
    // console.log(user);
    return (
        <div className="h-16 dark:bg-[#0A0A0A] bg-white dark:border-b border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 duration-300 z-10 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
                {/* Logo and Branding */}
                <div className="flex items-center gap-2">
                    <School size={28} className="text-blue-600 dark:text-white" />
                    <h1 className="hidden md:block font-extrabold text-2xl text-gray-900 dark:text-white">
                        Learnify
                    </h1>
                </div>

                {/* Right Side - Profile / Mobile Menu */}
                <div>
                    <div className="flex item-center gap-3">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger><Avatar className="rounded-lg">
                                    <AvatarImage
                                        src={user?.photoURL || "https://github.com/evilrabbit.png"}
                                        alt="@evilrabbit"
                                    />
                                    <AvatarFallback>ER</AvatarFallback>
                                </Avatar></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem><Link to="profile">Edit Profile</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link to="myLearning">My Learning</Link></DropdownMenuItem>
                                    <DropdownMenuItem onClick={logOutHandler}>Log Out</DropdownMenuItem>
                                    {
                                        user.role === 'instructor' && (<>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem><Link to = "admin">Dashboard</Link></DropdownMenuItem>
                                        </>)
                                    }

                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button onClick={() => { navigate("/login") }} variant="outline">Login</Button>
                                <Button onClick={() => { navigate("/login") }}>signup</Button>
                            </div>
                        )
                        }
                        <DarkMode />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
