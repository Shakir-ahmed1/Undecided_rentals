const { locationModel } = require('../models/housesModel');

function locationErrorHandler(e) {
  const errors = {
    country: '', city: '', latitude: '', longitude: '',
  };
  // input validation
  if (e.message.includes('Validation failed')) {
    Object.values(e.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

async function postLocation(req, res) {
  const {
    country, city, latitude, longitude,
  } = req.body;
  try {
    const values = {
      country, city, latitude, longitude,
    };
    await locationModel.validate(values);
    const location = await locationModel.create(values);
    res.status(201).json({ location });
  } catch (e) {
    const errors = locationErrorHandler(e);
    res.status(400).json({ errors });
  }
}

async function getLocation(req, res) {
  try {
    const { locationId } = req.params;
    const location = await locationModel.findOne({ _id: locationId });

    if (!location) {
      res.status(404).json({ error: 'Unknown location' });
    } else {
      res.json(location);
    }
  } catch (error) {
    res.status(404).json({ error: 'Unknown location' });
  }
}
async function allLocations(req, res) {
  try {
    const locations = await locationModel.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteLocation(req, res) {
  try {
    const { locationId } = req.params;
    const location = await locationModel.findOneAndDelete({ _id: locationId });

    if (!location) {
      res.status(404).json({ error: 'Unknown location, no location was deleted' });
    } else {
      res.json(location);
    }
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong' });
  }
}

module.exports = {
  postLocation, getLocation, allLocations, deleteLocation,
};
