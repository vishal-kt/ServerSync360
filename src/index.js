import 'dotenv/config'
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";


/*

this is first approach but there is some problem with that the index js file is too polluted
we need better and clean code
const app = express();
 ;( async()=>{ 
    try {
      await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}` ) 
      app.on("error",(error)=>{
        console.log("Errr",error);
        throw error 
      })  
      app.listen(process.env.PORT,()=>{
        console.log(`app is listening on PORT ${process.env.PORT}`);
      });
    } catch (error) {
        console.error("Error", error);
        throw error
    }
 })()

 */