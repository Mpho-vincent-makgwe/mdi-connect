import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: String,
  sector: { type: String, enum: ["Mining", "Tourism", "Manufacturing"] },
  requiredApplicants: Number,
  appliedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: { type: String, enum: ["Open", "Closed"], default: "Open" },
});

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
