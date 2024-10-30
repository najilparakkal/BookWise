import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl: string = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/PDF_Plate";

export async function connectDb() {
  console.log("Connecting to MongoDB at", mongoUrl); 
  try {
     mongoose.connect(mongoUrl).then(()=>console.log("Connected to MongoDB✅"))
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
  