// import { checkAuthentication } from "../../middleware/checkAuthentication";
import User from "../../models/User";
import dbConnect from "../../utils/dbConnect";

const handleQuestionnaire = async (req, res) => {
  if (req.method === "POST") {
    console.log("Received POST data:", req.body); // Debugging request data

    await dbConnect();

    const { userId, answers } = req.body;
    if (!userId || !answers) {
      return res.status(400).json({ message: "Missing userId or answers" });
    }

    try {
      let user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.yearsOfExperience = answers.yearsOfExperience || "";
      user.graduated = answers.graduated || "";
      user.currentlyInTertiary = answers.currentlyInTertiary || "";
      user.entryLevel = answers.entryLevel || "";
      user.sector = answers.sector || "";

      await user.save();
      res.status(200).json({ message: "Data saved successfully!" });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ message: "Error saving data" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handleQuestionnaire;
/* export default checkAuthentication(); */ 
// Apply authentication middleware
