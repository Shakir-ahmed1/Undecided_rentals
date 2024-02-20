const {locationModel} = require('../models/housesModel');

function locationErrorHandler(e) {
    errors = {country: '', city: '', lattitude: '', longitude: ''};
    // input validation
    if (e.message.includes('Validation failed')) {
        Object.values(e.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
        });
      }
    return errors;
}

async function postLocation(req, res) {
  const {country, city, lattitude, longitude } = req.body;
  try {
    const values = {country, city, lattitude, longitude};
    await locationModel.validate(values);
    const location = await locationModel.create(values);
    res.status(201).json({location}); 
  } catch (e) {
    console.log(e);
    const errors = locationErrorHandler(e);
    res.status(400).json({ errors });
  }
}


async function getLocation(req, res) {
    try {
        const {locationId} = req.params;
        const location = await locationModel.findOne({ _id: locationId });
    
        if (!location) {
          res.status(404).json({ error: 'Unknown location' });
        }
        res.json(location);
      } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
      }
}
const allLocations = async (req, res) => {
    try {
      const locations = await locationModel.find().select('country city');
      res.json(locations);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
      console.log(error);
    }
  };

module.exports = { postLocation, getLocation, allLocations };