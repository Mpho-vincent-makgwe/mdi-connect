import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    const user = await User.create(req.body);
    res.status(201).json(user);
  }
}
