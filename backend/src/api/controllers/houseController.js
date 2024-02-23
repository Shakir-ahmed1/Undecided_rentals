const {
  houseModel, amenityModel, locationModel, housePhotoModel,
} = require('../models/housesModel');
const User = require('../models/userModel');

function houseErrorHandler(e) {
  const errors = {
    user: '',
    name: '',
    description: '',
    numberOfRooms: '',
    maxGuest: '',
    pricePerNight: '',
    location: '',
    amenities: '',
    sharedBetween: '',
    housePhotos: '',
    reservedBy: '',
  };
  if (e.message.includes('Validation failed')) {
    Object.values(e.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  if (e.message.includes('Cast to ObjectId failed')) {
    if (e.message.includes('for model "User"')) {
      errors.user = 'In correct user ID';
    }
    if (e.message.includes('for model "Location"')) {
      errors.location = 'In correct location ID';
    }
    if (e.message.includes('for model "Amenity"')) {
      errors.amenities = 'In correct amenity ID(s)';
    }
  }
  return errors;
}
async function postHouse(req, res) {
  const {
    user, name, description, numberOfRooms, maxGuest,
    pricePerNight, location, amenities,
    sharedBetween, housePhotos, reservedBy,
  } = req.body;
  try {
    const theUser = await User.findOne({ _id: user });
    const existingLocation = await locationModel.findOne({ _id: location });
    const amenityList = await amenityModel.find({ _id: { $in: amenities } });
    const housePh = await housePhotoModel.create({ fileName: ['abcd', 'efgh'] || housePhotos });
    const houseAttributes = {
      user: theUser,
      name,
      description,
      numberOfRooms,
      maxGuest,
      pricePerNight,
      location: existingLocation,
      amenities: amenityList,
      sharedBetween,
      housePhotos: housePh,
      reservedBy,
    };
    await houseModel.validate(houseAttributes);
    const house = await houseModel.create(houseAttributes);

    res.status(201).json({ house });
  } catch (e) {
    const errors = houseErrorHandler(e);
    res.status(400).json({ errors });
  }
}

async function allHouses(req, res) {
  try {
    const houses = await houseModel.find();
    res.json(houses);
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getHouse(req, res) {
  try {
    const { houseId } = req.params;
    const house = await houseModel.findOne({ _id: houseId });

    if (!house) {
      res.status(404).json({ error: 'House could not be found' });
    } else {
      res.json(house);
    }
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(400).json({ error: 'Invalid houseId ID' });
    } else {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}

// async function myHouses(req, res) {

// }

async function deleteHouse(req, res) {
  try {
    const { houseId } = req.params;
    // const house = await houseModel.findOneAndDelete({ _id: houseId});
    const house = await houseModel.findOne({ _id: houseId });
    if (!house) {
      res.status(404).json({ error: 'Unknown house, no house was deleted' });
    } else {
      res.json(house);
    }
  } catch (e) {
    res.status(400).json({ error: 'Something went wrong' });
  }
}
// async function putHouse(req, res) {

// }

module.exports = {
  postHouse, allHouses, getHouse, /* myHouses, */ deleteHouse, /* putHouse, */
};
