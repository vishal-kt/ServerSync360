import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js" 
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser  = asyncHandler( async (req,res)=>{


    // return res.status(200).json({
    //     message:"we are connected"
    // })


    // here we will write the logic to register a user 
    // first get user details from frontend 
    //validation to check  like space , empty or email format  
    // check if the user already exists : username , email
    // check for files like images like avatar 
    // upload them to cloudinary , avatar 
    //crate user object to create entry in database 
    //remove password and refresh token filed from response 
    //check for user creation 
    //return response if not created send error 


    const {fullName,email,username,password} = req.body
    
    //validation code 

    // if(fullName ===""){
    //     throw new ApiError(400,"fullName is empty ")
    // }

    if(
        [fullName,email,username,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }
    
    
    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with Email or Username already exist")
    }

    const avatarLocalPath =    req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required ")
    }

  const avatar =  await uploadOnCloudinary(avatarLocalPath)

  const coverImage = await uploadOnCloudinary(coverImageLocalPath)


  if(!avatar){
    throw new ApiError(400,"avatar file is required ")
   }

   const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
    
    })


     const createdUser = await  User.findById(user._id).select(
        "-password -refreshToken"
     )

     if(!createdUser){
        throw new ApiError(500,"something went wrong while registering the user")
     }

     return res.status(201).json(new ApiResponse(200,createdUser,"User register successfully")
     )

    }
)


export {registerUser}