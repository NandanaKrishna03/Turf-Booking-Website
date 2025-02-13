import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
 export const connectDB= async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected");
    
    }
    catch(error){
        console.error(" MongoDB Connection Failed:", error);
        process.exit(1);
    }
}