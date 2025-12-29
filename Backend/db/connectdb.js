import mongoose from "mongoose";
import config from "config";

async function connectdb() {
  try {
    await mongoose.connect(config.get("database.url"));
    console.log("Connected to the database");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

export default connectdb;