const path = require('path');
const Profile = require('../models/profileModel');
const User = require('../models/userModel');

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password').populate('profile');

    if (!user) {
      res.status(404).json({ error: 'Profile with the user ID not found' });
    }
    res.json(user);
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).json({ error: 'Invalid user ID' });
    }
  }
};

const getAllProfile = async (req, res) => {
  try {
    const profiles = await User.find().populate('profile');
    res.json(profiles);
  } catch (error) {
    res.json({ error });
  }
};

const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (userId !== req.user) {
    res.json({ error: { unauthorized: 'you cannot edith this profile' } });
  } else {
    try {
      const {
        firstName, lastName, phoneNumber,
        bio, country, state, houseAddress,
      } = req.body;

      let profileImage;

      if (req.file) {
        profileImage = path.normalize(req.file.path);
      }
      // Update user fields
      const userUpdate = {
        firstName, lastName, phoneNumber,
      };
      await User.updateOne({ _id: userId }, userUpdate);

      const profileUpdate = {
        profileImage, bio, country, state, houseAddress,
      };
      await Profile.updateOne({ _id: user.profile }, profileUpdate);

      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};

module.exports = { getAllProfile, getProfile, updateProfile };
