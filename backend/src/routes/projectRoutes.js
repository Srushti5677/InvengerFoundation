const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

router.get("/", projectController.getProjects);
router.get("/:slug", projectController.getProjectBySlug);
router.post("/", verifyToken, isAdmin, projectController.createProject);
router.put("/:id", verifyToken, isAdmin, projectController.updateProject);
router.delete("/:id", verifyToken, isAdmin, projectController.deleteProject);

module.exports = router;
