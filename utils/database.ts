import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;

export const connectDB = async (): Promise<void> => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("mongodb is already connected");
        return;
    }

    try {
        const dbOptions: ConnectOptions = {
            dbName: 'blog-db'
        };
        await mongoose.connect(process.env.MONGO_URI || '', dbOptions);
        isConnected = true;
        console.log("mongodb connected");
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log("An unknown error occurred");
        }
    }
};
