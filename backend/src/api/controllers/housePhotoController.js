const path = require('path');
const { housePhotoModel } = require('../models/housesModel');

const postHousePhotos = async (req, res) => {
  if (req.file) {
    const fileName = path.normalize(req.file.path);
    try {
      const housePhotos = await housePhotoModel.create({ fileName });
      res.status(201).json({ housePhotos });
    } catch (error) {
      res.status(500).json({ error: { database: 'Failed to save photos to the database.' } });
    }
  } else {
    res.json({ error: { empty: 'please upload house photo' } });
  }
};

const getHousePhotos = async (req, res) => {
  const { photoId } = req.params;
  try {
    const housePhotos = await housePhotoModel.findById(photoId);
    if (!housePhotos) {
      return res.status(404).json({ error: { notFound: 'House photos with this id not found' } });
    }
    res.status(200).json({ housePhotos });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: { invalidId: 'The id is invalid' } });
    }
    res.status(500).json({ error: { error: error.message } });
  }
};

const getAllHousePhotos = async (req, res) => {
  try {
    const housePhotos = await housePhotoModel.find();
    res.status(200).json({ housePhotos });
  } catch (error) {
    res.status(500).json({ error: { error: error.message } });
  }
};

module.exports = { postHousePhotos, getHousePhotos, getAllHousePhotos };
