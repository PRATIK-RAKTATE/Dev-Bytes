import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '../../.env.development')
});

const connectDB = async () => {
     try {
        const connenction = await mongoose.connect(process.env.MONGO_URI);  
        console.log(`MongoDB connected: ${connenction.connection.host}`);
    }
    catch (error) {
        console.log("Error connection MongoDB :", error.message);
        process.exit(1); // failure
    }
}

export { connectDB };