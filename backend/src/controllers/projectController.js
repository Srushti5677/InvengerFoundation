const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects." });
  }
};

exports.getProjectBySlug = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({ where: { slug: req.params.slug } });
    if (!project) return res.status(404).json({ error: "Project not found." });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project." });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, summary, mainImage, content, impact, location, category, isFeatured } = req.body;
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const project = await prisma.project.create({
      data: { title, slug, summary, mainImage, content, impact, location, category, isFeatured }
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project." });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await prisma.project.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project." });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Project deleted." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project." });
  }
};
