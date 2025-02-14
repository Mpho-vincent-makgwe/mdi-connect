import nc from 'next-connect';
import Job from "../../../../../models/Job";
import User from "../../../../../models/User";
import dbConnect from "../../../../../utils/dbConnect";
import cloudinary from "../../../../../utils/cloudinary";
import multer from "multer";

// Setup multer to handle file uploads
const upload = multer().single('resume'); // Handles only a single file for 'resume'

export default async function handler(req, res) {
  await dbConnect("MDI-Connect");
  
  if (req.method === "POST") {
    const { jobId, name, email, phone, linkedin, coverLetter } = req.body;
    const resume = req.file;

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Upload resume to Cloudinary
    let resumeFileUrl = null;
    if (resume) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(resume.path, {
          folder: "job_applications",
          resource_type: "auto", // Automatically determine the file type
        });
        resumeFileUrl = uploadResponse.secure_url; // Save the secure URL of the file
      } catch (error) {
        return res.status(500).json({ message: "Error uploading resume" });
      }
    }

    // Check if the user already exists (for simplicity assuming email as unique identifier)
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        documents: [
          {
            filePath: resumeFileUrl,
            fileType: resume.mimetype,
            fileName: resume.originalname,
            fileUrl: resumeFileUrl,
          },
        ],
        appliedJobs: [
          {
            jobId: jobId,
            coverLetter: coverLetter,
            resumeUrl: resumeFileUrl,
          }
        ],
      });
      await user.save();
    } else {
      // If the user exists, just update the appliedJobs and documents
      user.appliedJobs.push({
        jobId: jobId,
        coverLetter: coverLetter,
        resumeUrl: resumeFileUrl,
      });
      if (resumeFileUrl) {
        user.documents.push({
          filePath: resumeFileUrl,
          fileType: resume.mimetype,
          fileName: resume.originalname,
          fileUrl: resumeFileUrl,
        });
      }
      await user.save();
    }

    // Add user to the job application list
    job.appliedUsers.push({
      userId: user._id,
      name: user.name,
      email: user.email,
      phone: phone,
      linkedin: linkedin,
      coverLetter: coverLetter,
      resumeUrl: resumeFileUrl,
    });
    await job.save();

    res.json({ message: "Application submitted!" });
  }
}
