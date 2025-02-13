// pages/api/jobs.js
import Job from "../../../models/Job"; // Adjust path to where your Job model is located
import dbConnect from "../../../utils/dbConnect"; // Adjust path as needed

export default async function handler(req, res) {
    if (req.method === "GET") {
      try {
        await dbConnect(); // Make sure database connection is established
  
        const jobs = await Job.find({}); // Query all jobs from the collection
        console.log("Fetched jobs: ", jobs); // Log jobs to ensure they are fetched
        res.status(200).json(jobs); // Return the jobs as JSON response
      } catch (error) {
        console.error("Error fetching jobs: ", error);
        res.status(500).json({ message: "Failed to fetch jobs." });
      }
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
  