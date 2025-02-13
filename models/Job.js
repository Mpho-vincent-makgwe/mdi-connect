import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  sector: { type: String, enum: ["Mining", "Tourism", "Manufacturing"], required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true }, // e.g., "$60,000 - $80,000 per year"
  description: { type: String, required: true },
  requirements: { type: [String], required: true },
  img: { type: String, required: true }, // URL to job post image
  requiredApplicants: { type: Number, required: true },
  appliedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: { type: String, enum: ["Open", "Closed"], default: "Open" },
  deadline: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
