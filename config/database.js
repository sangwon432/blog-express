import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connected");

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;