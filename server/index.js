import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js"
dotenv.config();
connectDB(); 
const app = express();
const PORT = process.env.PORT || 3000;

// default middleware;
app.use(express.json());
// Purpose: Parses incoming application/json payloads 
// (like from a frontend form or fetch/axios).
// If you don’t use it: req.body will be undefined,
//  and you won’t be able to read POST request data

app.use(cookieParser());
//Purpose: Parses cookies attached to incoming requests
//(i.e., req.cookies will be available).
//If you don’t use it: You won't be able to read cookies,
//like JWTs sent from the browser in req.cookies.token.

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
//Purpose: Enables CORS (Cross-Origin Resource Sharing).
//You're telling the backend to accept requests 
//from the frontend running at http://localhost:8000 (like React or Next.js).
//credentials: true allows cookies to be included
// in requests (important for JWT auth).

// api's
app.use("/api/v1/user", userRoute);

// example
// app.get("/home", (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Helllllooooo"
//     })
// })

app.listen(PORT, () => {
    console.log(`server listen at port ${PORT}`); 
})

