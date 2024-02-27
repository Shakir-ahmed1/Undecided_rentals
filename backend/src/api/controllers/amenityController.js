const { amenityModel } = require('../models/housesModel');

async function postAmenity(req, res) {
  const { name } = req.body;
  try {
    await amenityModel.validate({ name });
    const amenity = await amenityModel.create({ name });
    res.status(201).json({ amenity });
  } catch (e) {
    const errors = { name: '' };
    if (e.code === 11000) {
      errors.name = 'Amenity already exists';
    }
    res.status(400).json({ errors });
  }
}
async function getAmenity(req, res) {
  try {
    const { amenityId } = req.params;
    const amenity = await amenityModel.findOne({ _id: amenityId });

    if (!amenity) {
      res.status(404).json({ error: 'Unknown amenity' });
    } else {
      res.json({ amenity });
    }
  } catch (error) {
    res.status(404).json({ error: 'Unknown amenity' });
  }
}

async function deleteAmenity(req, res) {
  try {
    const { amenityId } = req.params;
    const amenity = await amenityModel.findOneAndDelete({ _id: amenityId });

    if (!amenity) {
      res.status(404).json({ error: 'Unknown amenity, no amenity was deleted' });
    } else {
      res.json(amenity);
    }
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong' });
  }
}

async function allAmenities(req, res) {
  try {
    const amenities = await amenityModel.find();
    res.json(amenities);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  postAmenity, getAmenity, allAmenities, deleteAmenity,
};
