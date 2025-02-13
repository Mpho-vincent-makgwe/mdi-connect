import bcrypt from "bcrypt";
import User from "../../models/User";
import dbConnect from "../../utils/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    // console.log("User:", user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    // Compare the password with the stored hash
    const passwordMatch = await bcrypt.compare(password,hashedPassword);
    console.log("Password Match:", passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Login successful
    res.status(200).json({ message: "Login successful", user });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
