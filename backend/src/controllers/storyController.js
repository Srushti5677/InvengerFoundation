const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getStories = async (req, res) => {
  try {
    const stories = await prisma.successStory.findMany({ orderBy: { createdAt: "desc" } });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stories." });
  }
};

exports.createStory = async (req, res) => {
  try {
    const { title, subtitle, imageUrl, beforeText, afterText, quote, quotePerson, color, isMilestone, year } = req.body;
    const story = await prisma.successStory.create({ 
      data: { 
        title, 
        subtitle, 
        imageUrl, 
        beforeText, 
        afterText, 
        quote, 
        quotePerson, 
        color,
        isMilestone: isMilestone === true || isMilestone === "true",
        year: year ? parseInt(year) : null
      } 
    });
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ error: "Failed to create story." });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    await prisma.successStory.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Story deleted." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete story." });
  }
};
