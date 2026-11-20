import app from './app';
import dotenv from "dotenv";
import { connectDB } from './config/db';



dotenv.config();

const PORT = process.env.PORT;
const startServer=async()=>{
  try{
    await connectDB()
    app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

  }catch(error){
    console.error('Failed to start server:', error);

  }
}

startServer();