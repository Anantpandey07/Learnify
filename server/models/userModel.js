import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required : true,
    },
    role: {
        type: String,
        enum: ["instructer", "student"],
        default: 'student'
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    photoURL: {
        type:String,
        default: "",
    }
}, {timestamps:true});

export const User = mongoose.model("User", userSchema);