import mongoose, { ConnectOptions } from "mongoose";

export async function connectDB(uri: string) {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
    } as ConnectOptions);
}

export async function disconnectDB() {
    await mongoose.disconnect();
}