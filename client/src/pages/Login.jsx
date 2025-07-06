import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [loginInput, setLoginInput] = useState({
        email:"",
        password:""
    });
    const [signUpInput, setSignupInput] = useState({
        name: "",
        email:"",
        password:""
    });

    const [registerUser, {data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSucces}] = useRegisterUserMutation();
    const [loginUser, {data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSucces}] = useLoginUserMutation();

    const navigate = useNavigate();

    const changeInputHandler = (e, type) =>{
        const {name, value} = e.target;
        if(type == 'signup'){
            setSignupInput({ ...signUpInput, [name]: value});
        }
        else{
            setLoginInput({...loginInput, [name]: value})
        }
        // console.log(value);
    };
    const handleRegistration = async (type) => {
        const inputData = type === "signup" ? signUpInput : loginInput;
        // console.log(inputData)
        const action = type === "signup" ? registerUser : loginUser;
        await action(inputData);
    }

    useEffect(() =>{
      if(registerIsSucces && registerData){
        toast.success(registerData.message || "SignUp Successful.")
      }
      // if(!registerIsSucces){
      //   toast.error(registerData.data.message);
      // }
      if(registerError){
        toast.error(registerData?.data?.message || "All fields are required !!");
      }
      if(loginIsSucces && loginData){
        toast.success(loginData.message || "Welcome Back !!")
        navigate("/");
      }
      if(loginError){
        toast.error(loginData?.data?.message || "Check Email or Password !!")
      }
    }, [loginData, registerData, loginError, registerError, loginIsLoading, registerIsLoading])
  return (
    <div className="flex items-center justify-center w-full mt-18">
      <Tabs defaultValue="account" className="w-[600px]">
        <TabsList className="w-full">
          <TabsTrigger value="signup">SignUp</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Create a new account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input 
                onChange = {(e) => changeInputHandler(e, "signup")} 
                name = "name"
                value = {signUpInput.name}
                type="text" 
                placeholder="Username" 
                required="true"/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Email</Label>
                <Input name = "email" value = {signUpInput.email} onChange = {(e) => changeInputHandler(e, "signup")} type="email"  placeholder="abc@gmail.com" required="true" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Password</Label>
                <Input name="password" value = {signUpInput.password} onChange = {(e) => changeInputHandler(e, "signup")} type="password" placeholder="Password" required="true" />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled = {registerIsLoading} onClick = {() => handleRegistration("signup")}>
                {
                  registerIsLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    </>
                  ) : "SignUp"
                }
                </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login via Email and Password
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Email</Label>
                <Input name ="email" value = {loginInput.email} onChange = {(e) => changeInputHandler(e, "login")} type="text" placeholder="abc@gmail.com" required="true"/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">Password</Label>
                <Input name="password" value = {loginInput.password} onChange = {(e) => changeInputHandler(e, "login")} placeholder="Password" type="password" required="true" />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled = {loginIsLoading} onClick = {() => handleRegistration("login")}>
                {
                  loginIsLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    </>
                  ) : "Login"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Login
