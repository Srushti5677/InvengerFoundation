const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure local disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../public/uploads');
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// POST /api/upload   (Admin Only)
const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file provided.' });

    // In a production environment with a domain, this would be https://yourdomain.com/uploads/...
    // For local development, we return a relative path that the frontend can append to the API base
    const fileUrl = `/uploads/${file.filename}`;

    res.json({ 
      url: fileUrl, 
      filename: file.filename,
      message: 'Upload successful to local server.'
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: 'Upload failed.' });
  }
};

module.exports = { upload, uploadFile };
