import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DB_URI_TEST);
        console.log('Connect to DB');
    }catch(err){
        console.log(`Failed to connect to DB: ${err}`);
    }
};