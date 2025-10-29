import mongoose from "mongoose";
import { _env } from "../config/_env";

let db: mongoose.Connection;

const ConnectToDB = async () => {
  const databaseUrl = _env.DB_URL as string;

  try {
    await mongoose.connect(databaseUrl, {
      autoIndex: true,
    });

    db = mongoose.connection;
    console.log("Test_Buddy_DB connected.");
  } catch (error) {
    console.log("Error connecting to databases:", error);
  }
};

export { db };
export default ConnectToDB;
