const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

router.get("/", galleryController.getGallery);
router.post("/", verifyToken, isAdmin, galleryController.createGalleryItem);
router.delete("/:id", verifyToken, isAdmin, galleryController.deleteGalleryItem);

module.exports = router;
