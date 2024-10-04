import mongoose, { MongooseError } from "mongoose";
import log from "./logger";

async function connectToDb() {
  const dbUri = process.env.DATABASE_URL as string;

  try {
    await mongoose.connect(dbUri);
    log.info("Connected to DB");
  } catch (e) {
    if (e instanceof MongooseError) {
      log.error(`Error connecting to DB: ${e.message}`);
    }
    process.exit(1);
  }
}

export default connectToDb;
