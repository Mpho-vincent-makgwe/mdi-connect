import multer from "multer";
import { Readable } from "stream";
import User from "../../models/User";
import cloudinary from "../../utils/cloudinary"; // Import Cloudinary config
import dbConnect from "../../utils/dbConnect";

// Initialize multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect("MDI-Connect"); // Connect to MongoDB

  upload.array("files")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Error parsing form data" });
    }

    const files = req.files;
    const { types, userId } = req.body; // Document types and userId sent with the upload

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const uploadedDocs = await Promise.all(
        files.map((file, index) => {
          return new Promise((resolve, reject) => {
            const documentType = types[index] || "Unknown";
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: "documents",
                resource_type: "auto",
              },
              async (error, result) => {
                if (error) {
                  console.error("Cloudinary upload error:", error);
                  reject(error);
                } else {
                  console.log("Cloudinary upload result:", result);
                  console.log("Cloudinary upload URL:", result.secure_url);
                  resolve({
                    fileName: file.originalname,
                    fileType: documentType,
                    fileUrl: result.secure_url,
                  });
                }
              }
            );
            Readable.from(file.buffer).pipe(stream);
          });
        })
      );

      // Save uploaded documents to MongoDB
      user.documents.push(...uploadedDocs);
      await user.save();

      res.status(200).json({
        message: "Documents uploaded successfully",
        documents: uploadedDocs,
      });
    } catch (error) {
      console.error("Error uploading documents:", error);
      res.status(500).json({ message: "Error uploading documents" });
    }
  });
}
