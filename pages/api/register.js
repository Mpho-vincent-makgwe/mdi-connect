import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect("MDI-Connect");

    const { name, email, password, experience, documents } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      experience,
      documents,
    });

    await newUser.save();

    // Exclude password from the response
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      experience: newUser.experience,
      documents: newUser.documents,
    };

    res.status(201).json({ message: "User registered successfully!", user: userResponse });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
