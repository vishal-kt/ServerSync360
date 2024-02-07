import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    
},{timestamps:true})


export const VideoSchema = mongoose.model("VideoSchema",videoSchema)



