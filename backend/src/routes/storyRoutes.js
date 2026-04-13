const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

router.get("/", storyController.getStories);
router.post("/", verifyToken, isAdmin, storyController.createStory);
router.delete("/:id", verifyToken, isAdmin, storyController.deleteStory);

module.exports = router;
