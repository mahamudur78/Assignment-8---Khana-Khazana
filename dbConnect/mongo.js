import mongoose from "mongoose";

export async function mongoDBConnect() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo Database Connected");
        return conn;
    } catch (err) {
        console.log(err);
    }
}
