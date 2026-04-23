const express = require('express');
const router = express.Router();
const { createVolunteer, getAllVolunteers, deleteVolunteer } = require('../controllers/volunteerController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Public route to submit volunteer application
router.post('/', createVolunteer);

// Admin-only routes to view and manage volunteers
router.get('/', verifyToken, isAdmin, getAllVolunteers);
router.delete('/:id', verifyToken, isAdmin, deleteVolunteer);

module.exports = router;
