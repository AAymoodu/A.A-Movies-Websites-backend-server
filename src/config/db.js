import mongoose from "mongoose";
import env from "./env.js";
const connectUrl = env.DB_URL;
mongoose.set("strictQuery", true);


const connectDatabase = async () => {
  try {
    if (!connectUrl) {
      console.log("Database URL is not set");
      process.exit(1);
    }
    console.log("Connecting to database.....");
    await mongoose.connect(connectUrl);
    console.log("Connection to AA Movies Database was Successful");
  } catch (err) {
    console.error(`An error occured: ${err.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
