import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";

dotenv.config();
connectDB(); 
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server listen at port ${PORT}`); 
})

// qIEaJ82h2HPVMqox
// mongodb+srv://anantpandey175:qIEaJ82h2HPVMqox@cluster0.bvfqb0n.mongodb.net/