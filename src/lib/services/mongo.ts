import mongoose from "mongoose";

interface Connection {
    isConnected?: number;
}

const connection: Connection = {};

export const connectToDb = async() => {
    try {
        if(connection.isConnected) {
            console.log("Connect from existing connection");
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URL!);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.error("Error connecting to database: ", error);
        throw new Error("Could not connect to the database.");
    }

}