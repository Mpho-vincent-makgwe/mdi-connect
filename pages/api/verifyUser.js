import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;
      await dbConnect("MDI-Connect"); // Ensure you connect to MongoDB

      const user = await User.findOne({ email });

      if (user) {
        return res.status(200).json({ userExists: true });
      } else {
        return res.status(404).json({ userExists: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
