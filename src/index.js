
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import app from "./app.js"

dotenv.config({
  path:'./.env'
})


connectDB() 
.then(()=>{
  app.listen(process.env.PORT||8000,()=>{ 
    console.log(`server is running at port :{process.env.PORT}`);
  })
}) 
.catch((err)=>{
  console.log("MongoDB connection failed !!",err );
})

















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