import config from "config";
import { connect } from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI: string = config.get("MONGODB_URI");
        const conn = await connect(mongoURI);

        if (conn.ConnectionStates.connected) console.log("Connected to MongoDB ✅");
        else console.log("Failed to connect to MongoDB");
    } catch (error: any) {
        console.log(error.message);
        process.exit(1);
    }
};

export default connectDB;
