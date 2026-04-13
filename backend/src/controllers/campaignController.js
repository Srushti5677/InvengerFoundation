const prisma = require('../models/prismaClient');

// GET /api/campaigns  (public)
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({ where: { isActive: true } });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch campaigns.' });
  }
};

// GET /api/campaigns/:id  (public)
const getCampaignById = async (req, res) => {
  try {
    const campaign = await prisma.campaign.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!campaign) return res.status(404).json({ error: 'Campaign not found.' });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch campaign.' });
  }
};

// POST /api/campaigns  (admin only)
const createCampaign = async (req, res) => {
  const { title, description, goalAmount, imageUrl, videoUrl } = req.body;
  try {
    const campaign = await prisma.campaign.create({
      data: { title, description, goalAmount, imageUrl, videoUrl },
    });
    res.status(201).json({ message: 'Campaign created!', campaign });
  } catch (err) {
    res.status(500).json({ error: 'Could not create campaign.' });
  }
};

// PUT /api/campaigns/:id  (admin only)
const updateCampaign = async (req, res) => {
  try {
    const campaign = await prisma.campaign.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json({ message: 'Campaign updated!', campaign });
  } catch (err) {
    res.status(500).json({ error: 'Could not update campaign.' });
  }
};

// DELETE /api/campaigns/:id  (admin only)
const deleteCampaign = async (req, res) => {
  try {
    await prisma.campaign.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Campaign deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete campaign.' });
  }
};

module.exports = { getAllCampaigns, getCampaignById, createCampaign, updateCampaign, deleteCampaign };
