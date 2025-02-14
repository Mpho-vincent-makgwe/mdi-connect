import { getJobDetails } from "../../../helpers/mongo-utils";

export default async function handler(req, res) {
  const { method } = req;
  const { title } = req.query; // Use title from query
  console.log("Job title found in the api:", title);
  switch (method) {
    case "GET":
      try {
        const job = await getJobDetails(title); // Call helper function to fetch job
        console.log("Job details:", job)
        if (!job) {
          return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job); // Send job details in the response
      } catch (error) {
        res.status(500).json({ message: "Error fetching job details", error: error.message });
      }
      break;

    default:
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
