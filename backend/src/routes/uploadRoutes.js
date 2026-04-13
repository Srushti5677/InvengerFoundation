const express = require('express');
const router = express.Router();
const { upload, uploadFile } = require('../controllers/uploadController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// POST /api/upload  — Admin only, single file
router.post('/', verifyToken, isAdmin, upload.single('file'), uploadFile);

module.exports = router;
