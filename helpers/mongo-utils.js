import dbConnect from "../utils/dbConnect";
import Job from "../models/Job"
export const getJobDetails = async (title) =>{
    try{
    await dbConnect("MDI-Connect");
    const job = await Job.findOne({ title }); // Find job by title
    return job;
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw new Error("Error fetching job details");
  }
}