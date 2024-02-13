const Profile = require('../models/profileModel');

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ user: userId }).populate('user', 'firstName lastName email PhoneNumber');

    if (!profile) {
      res.status(404).json({ error: 'Profile with the user ID not found' });
    }
    res.json(profile);
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).json({ error: 'Invalid user ID' });
    }
  }
};

const getAllProfile = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'firstName lastName email phoneNumber');
    res.json(profiles);
  } catch (error) {
    res.json({ error });
  }
};

module.exports = { getAllProfile, getProfile };
