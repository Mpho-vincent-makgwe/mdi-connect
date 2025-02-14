import jwt from "jsonwebtoken";
import User from "../models/User";
import dbConnect from "../utils/dbConnect";

const checkAuthentication = (handler) => async (req, res) => {
  await dbConnect("MDI-Connect");

  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password"); // Exclude password field

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user; // Attach user object to request
    return handler(req, res);
  } catch (error) {
    console.error("JWT Authentication Error:", error.message);
    return res.status(401).json({
      message: error.name === "TokenExpiredError" 
        ? "Unauthorized: Token expired" 
        : "Unauthorized: Invalid token",
    });
  }
};

export { checkAuthentication };
