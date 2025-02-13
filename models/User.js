import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ["skilled", "unskilled"], required: false },
  experience: String,
  qualifications: [String],
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
