// Importing the Cloudinary SDK's v2 module as 'cloudinary' for easier reference
import { v2 as cloudinary } from "cloudinary";

// Importing the 'fs' module from Node.js, which provides utilities for working with the file system        
import fs from "fs";

// Configuring Cloudinary with the credentials obtained from environment variables
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET // Cloudinary API secret
});

// Defining an asynchronous function to upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
   try {
        // Checking if the local file path is provided
        if (!localFilePath) return null;

        // Uploading the file to Cloudinary using the 'uploader.upload' method
        const response = await cloudinary.uploader.upload(
            localFilePath, // Local file path to upload
            {
                resource_type: "auto" // Automatically determine the resource type
            }
        );

        // Logging a message indicating successful upload along with the URL of the uploaded file
        console.log("File is uploaded on Cloudinary:", response.url);

        // Returning the response object containing information about the uploaded file
        return response;
    } catch (error) {
        // If an error occurs during the upload process

        // Removing the locally saved temporary file as the upload operation failed
        fs.unlinkSync(localFilePath);

        // Returning null to indicate failure
        return null;
    }
}

// Exporting the 'uploadOnCloudinary' function to make it accessible to other modules
export { uploadOnCloudinary };
