import { v2 as cloudinary } from "cloudinary";
import fs from "fs" // "fs" is  file system it comes with node js it helps in file read .. write and every operation 
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY , 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
   try {
        if(!localFilePath) return null 
        const response = await cloudinary.uploader.upload(
            localFilePath,{
                resource_type:"auto"
            }
        )
        //file has been uploaded successfully 
        console.log(" file is uploaded on cloudinary ");

    } catch (error) {
        
    }
}
