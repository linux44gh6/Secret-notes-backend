import app from './app';
import dotenv from "dotenv";
import connectDb from './config/db';


dotenv.config();

const PORT = process.env.PORT;
const startServer=async()=>{
  try{
    await connectDb()
    app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

  }catch(error){
    console.error('Failed to start server:', error);

  }
}

startServer();