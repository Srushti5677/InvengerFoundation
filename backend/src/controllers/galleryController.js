const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getGallery = async (req, res) => {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gallery items." });
  }
};

exports.createGalleryItem = async (req, res) => {
  try {
    const { title, imageUrl, category, date, location, impact, description, lat, lng } = req.body;
    const item = await prisma.galleryItem.create({
      data: { 
        title, 
        imageUrl, 
        category, 
        date, 
        location, 
        impact, 
        description,
        lat: lat ? parseFloat(lat) : null,
        lng: lng ? parseFloat(lng) : null
      },
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to create gallery item." });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  try {
    await prisma.galleryItem.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Item deleted." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete gallery item." });
  }
};
