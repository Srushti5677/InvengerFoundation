const express = require('express');
const router = express.Router();
const { getAllCampaigns, getCampaignById, createCampaign, updateCampaign, deleteCampaign } = require('../controllers/campaignController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);

// Admin-only routes
router.post('/', verifyToken, isAdmin, createCampaign);
router.put('/:id', verifyToken, isAdmin, updateCampaign);
router.delete('/:id', verifyToken, isAdmin, deleteCampaign);

module.exports = router;
