// pages/api/jobs.js
import Job from "../../../models/Job"; // Adjust path to where your Job model is located
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
  console.log("Jobs Model:", Job);  // Log the model for confirmation
  console.log("Request Method:", req.method);

  // Establish a database connection
  await dbConnect("MDI-Connect");
  console.log("Database connected successfully");

  if (req.method === "GET") {
    console.log('Request received for /api/jobs');
    const authHeader = req.headers['authorization'];
    console.log("Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(400).json({ error: "Authorization token is required" });
    }

    const userId = authHeader.split(' ')[1];
    console.log("User ID extracted:", userId);

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!user.sector) {
        return res.status(400).json({ error: "User sector is missing" });
      }

      console.log("User Sector:", user.sector);

      // Fetch all jobs to verify the collection is accessible
      const allJobs = await Job.find({});
      console.log("All Jobs in Collection:", allJobs, "from Collection:", Job);

      // Fetch jobs based on the user's sector
      const regex = new RegExp(user.sector, 'i');
      console.log("Job search regex:", regex);
      const jobs = await Job.find({ sector: user.sector });
      console.log("Fetched Jobs by Sector:", jobs);

      if (jobs.length === 0) {
        return res.status(404).json({ message: "No jobs found for this sector" });
      }

      return res.status(200).json(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}