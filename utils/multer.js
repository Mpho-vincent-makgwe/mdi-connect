// utils/multer.js
import multer from 'multer';
import path from 'path';

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Store in 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
  },
});

// Create multer instance with storage options
const upload = multer({ storage });

export default upload;
