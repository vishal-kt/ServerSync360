// Import necessary modules
import mongoose, { Schema } from "mongoose"; // Import mongoose for MongoDB schema definition
import Jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    // Define username field
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true // Create index for quick lookup
    },

    // Define email field
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },

    // Define fullName field
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },

    // Define avatar field
    avatar: {
        type: String, // cloudinary url
        required: true
    },

    // Define coverImage field
    coverImage: {
        type: String, // cloudinary url
    },

    // Define watchHistory field
    watchHistory: [
        {
            type: Schema.Types.ObjectId, // Reference to Video schema
            ref: "Video"
        }
    ],

    // Define password field
    password: {
        type: String,
        required: [true, "password is required"] // Error message if password is missing
    },

    // Define refreshToken field
    refreshToken: {
        type: String
    }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt fields

// Middleware: Execute before saving data
userSchema.pre("save", async function (next) {
    // Check if password has been modified
    if (!this.isModified("password")) return next();
    // Hash the password using bcrypt
    this.password = await  bcrypt.hash(this.password, 10); // 10 is the saltRounds value
    next(); // Proceed to next middleware
});

// Method to check if password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
    // Compare provided password with stored hashed password
    return await bcrypt.compare(password, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
    // Generate JWT access token
    return Jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET, // Secret key for token signing
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Token expiry duration
        }
    );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
    // Generate JWT refresh token
    return Jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET, // Secret key for token signing
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Token expiry duration
        }
    );
};

// Export the User model
export const User = mongoose.model("User", userSchema);











































// import mongoose, { Schema } from "mongoose";
// import  Jwt  from "jsonwebtoken";
// import bcrypt from "bcrypt"
// const userSchema  = new mongoose.Schema(
//     {

//         username:{
//             type:String,
//             required:true,
//             lowercase:true,
//             unique:true,
//             trim :true,
//             index:true
//         },

//         email:
//         { 
//             type:String,
//             required:true,
//             lowercase:true,
//             unique:true,
//             trim :true,
           
//         },

//         fullName:{
//             type:String,
//             required:true,
//             lowercase:true,
//             unique:true,
//             trim :true,
            
//         },
//         avatar:{
//             type:String, //cloudinary url, 
//             required:true
//         },
//         coverImage:{
//             type:String, //cloudinary url, 
            
//         },
//         watchHistory:[
//             {
//                 type:Schema.Types.ObjectId,
//                 ref:"Video"
//             }
//         ],
//         password:{
//             type:String,
//             required:[true,"password is required"]
//         },
//         refreshToken:{
//             type:String
//         }

// },{timestamps:true})

// // this middleware "pre" hook  work just before the data is about to save  


// userSchema.pre("save",async function (next) {
//     // this if condition is added here bcz we  dnt want this password to encrypt all the time 
//     // thats why we added here that if the password is not modified / changed do dnt do anything move to next 

//     if(!this.isModified("password")) return next()
//     this.password = bcrypt.hash(this.password,10)
//     next() 
// })

// userSchema.methods.isPasswordCorrect =async function (password) {
//     return await bcrypt.compare(password,this.password)
// } 

// userSchema.methods.generateAccessToken = function () {
//    return Jwt.sign( {
//         _id:this._id,
//         email:this.email,
//         username:this.username,
//         fullName:this.fullName

//          },
 
//          process.env.ACCESS_TOKEN_SECRET,
//         {
//         expiresIn:process.env.ACCESS_TOKEN_EXPIRY
//         }
    
//      )
// }


// userSchema.methods.generateRefreshToken = function () {

//     return Jwt.sign(
//         {
//             _id:this._id,
//         },
//         process.env.REFRESH_TOKEN_SECRET,{
//             expiresIn:process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
    
// }
// export const User = mongoose.model("User",userSchema)    

