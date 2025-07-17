import dotenv from "dotenv";


import connectDB from "./db/index.js";
dotenv.config({path: './env'})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`your server is running on Port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("DB connection failed !!! ", err)
})









/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
const app = express();

(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error)=>{
            console.err("ERR : ", error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log("App runing on port ", process.env.PORT)
        })
    }catch(err){
        console.err("Err : ", err);
        throw err
    }
})()*/