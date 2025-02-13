import Job from "../../models/Job";
import dbConnect from "../../utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    const { jobId, name, email } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.appliedUsers.push({ name, email });
    await job.save();
    res.json({ message: "Application submitted!" });
  }
}
