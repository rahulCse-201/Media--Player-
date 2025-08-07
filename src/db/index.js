import dotenv from "dotenv";
dotenv.config(); // This must be before using process.env
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MONGODB CONNECTED!! DB HOST: ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("Err : ", error); 
        process.exit(1);
    }
}

export default connectDB ; 