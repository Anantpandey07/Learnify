import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required. ",
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exist with this Email",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword,
        })
        return res.status(201).json({
            success: true,
            message: "Account Created Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            mesaage: "Failed to register"
        })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = await req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required. ",
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not Exist, Create a new account",
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password",
            })
        }

        // generating token 
        generateToken(res, user, `Welcome Back ${user.name}`)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            mesaage: "Failed to Login"
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "Logged Out Successfully !!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            mesaage: "Failed to LogOut"
        })
    }
}


export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id; // we have save user id in req.id in middleware isAuth
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "Profile Not Found",
                success: false,
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            mesaage: "Failed to Fetch"
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if (!user) {
            console.log(error);
            return res.status(500).json({
                success: false,
                mesaage: "User Not Found"
            })
        }
        // extracting the publicId of the old image if it exists
        if(user.photoURL){
            const publicId = user.photoURL.split("/").pop().split(".")[0]; //extract public id
            deleteMediaFromCloudinary(publicId);
        }

        // upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);

        const photoURL = cloudResponse.secure_url;
        const updatedData = {name, photoURL};

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new: true}).select("-password");

        return res.status(200).json({
            success:true,
            user: updatedUser,
            message: "Profile updated Successfully 🎊🎊"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            mesaage: "Failed to update"
        })
    }
}