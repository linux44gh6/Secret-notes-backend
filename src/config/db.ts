import mongoose from "mongoose";
const connectDb=async()=>{
    try{
        const mongoURI=process.env.MONGO_URI
        if(!mongoURI){
            throw new Error("MONGODB_URI is missing")
        }
        await mongoose.connect(mongoURI)
        console.log('MongoDb connected succesfull')
    }catch(error){
        console.error('Faild to connect mongoDb')
        process.exit(1)
    }
}
export default connectDb