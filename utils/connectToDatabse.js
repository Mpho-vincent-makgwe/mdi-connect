import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = "MDI-Connect"; // Ensure this matches your actual database name

let client;
let db;

async function connectToDatabase() {
  if (client && db) {
    console.log("Using existing MongoDB connection");
    return db.collection("jobs"); // Return the collection
  }

  try {
    console.log("Connecting to MongoDB...");
    client = new MongoClient(MONGODB_URI);

    await client.connect();
    db = client.db(DATABASE_NAME); // Get the database
    const jobsCollection = db.collection("jobs"); // Get the collection

    if (!jobsCollection) {
      console.error("Collection 'jobs' not found in database.");
      throw new Error("Collection 'jobs' not found in database.");
    }

    console.log("Connected to MongoDB ✅ - Database:", DATABASE_NAME);
    return jobsCollection; // Return collection
  } catch (error) {
    console.error("MongoDB connection failed ❌:", error);
    throw new Error("Database connection failed.");
  }
}

export default connectToDatabase;