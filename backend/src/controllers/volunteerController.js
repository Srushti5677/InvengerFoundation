const prisma = require('../models/prismaClient');
const { sendVolunteerNotification, sendVolunteerThankYou } = require('../utils/emailService');

// POST /api/volunteers (Public)
const createVolunteer = async (req, res) => {
  const { name, email, phone, availability } = req.body;
  if (!name || !email || !availability) {
    return res.status(400).json({ error: 'Name, email, and availability are required.' });
  }

  try {
    const volunteer = await prisma.volunteer.create({
      data: { name, email, phone: phone || "", availability },
    });

    // Trigger emails in background (don't await to keep response fast)
    sendVolunteerNotification(volunteer);
    sendVolunteerThankYou(volunteer);

    res.status(201).json({ message: 'Success! You have joined as a volunteer.', volunteer });
  } catch (err) {

    console.error('Create Volunteer Error:', err);
    res.status(500).json({ error: 'Failed to process volunteer request.' });
  }
};

// GET /api/volunteers (Admin only)
const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await prisma.volunteer.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(volunteers);
  } catch (err) {
    console.error('Fetch Volunteers Error:', err);
    res.status(500).json({ error: 'Could not fetch volunteers.' });
  }
};

// DELETE /api/volunteers/:id (Admin only)
const deleteVolunteer = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.volunteer.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Volunteer application removed.' });
  } catch (err) {
    console.error('Delete Volunteer Error:', err);
    res.status(500).json({ error: 'Could not delete volunteer entry.' });
  }
};

module.exports = {
  createVolunteer,
  getAllVolunteers,
  deleteVolunteer,
};
