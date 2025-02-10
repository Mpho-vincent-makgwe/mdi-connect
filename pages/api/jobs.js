import dbConnect from "../../utils/dbConnect";
import Job from "../../models/Job"

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const jobs = await Job.find();
    res.json(jobs);
  } else if (req.method === "POST") {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  }
}
