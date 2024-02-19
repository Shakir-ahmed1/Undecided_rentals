const Profile = require('../models/profileModel');
const User = require('../models/userModel');

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

const updateProfile = async (req, res) => {
  const { userId } = req;
  try {
    const {
      firstName, lastName, phoneNumber,
      bio, country, state, houseAddress,
    } = req.body;

    let profileImage;

    if (req.file) {
      profileImage = req.file.filename;
    }
    // Update user fields
    const userUpdate = {
      firstName, lastName, phoneNumber,
    };
    await User.updateOne({ _id: userId }, userUpdate);

    const profileUpdate = {
      profileImage, bio, country, state, houseAddress,
    };
    await Profile.updateOne({ user: userId }, profileUpdate);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { getAllProfile, getProfile, updateProfile };
