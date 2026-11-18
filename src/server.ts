import app from './app';
import dotenv from "dotenv";
import connectDb from './config/db';

const PORT = 3000;

dotenv.config();

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