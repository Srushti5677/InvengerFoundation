const multer = require('multer');
const supabase = require('../models/supabaseClient');
const path = require('path');

// Use memory storage — we pass the buffer directly to Supabase
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/upload   (Admin Only)
const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file provided.' });

    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;

    const { data, error } = await supabase.storage
      .from('media')
      .upload(filename, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) return res.status(500).json({ error: error.message });

    const { data: urlData } = supabase.storage
      .from('media')
      .getPublicUrl(filename);

    res.json({ url: urlData.publicUrl, filename });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed.' });
  }
};

module.exports = { upload, uploadFile };
