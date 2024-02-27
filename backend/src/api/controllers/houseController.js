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
  if (e.message.includes('Validation failed') || e.message.includes('House validation failed')) {
    Object.values(e.errors).forEach(({ properties }) => {
      if (properties) {
        errors[properties.path] = properties.message;
      } else {
        errors.message = properties;
      }
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
  Object.keys(errors).forEach((key) => {
    if (errors[key] === '') {
      delete errors[key];
    }
  });
  return errors;
}
async function postHouse(req, res) {
  const {
    name, description, numberOfRooms, maxGuest,
    pricePerNight, location, amenities,
    sharedBetween, housePhotos,
  } = req.body;
  try {
    const { user } = req;
    const theUser = await User.findOne({ _id: user });
    const existingLocation = await locationModel.findOne({ _id: location });
    const amenityList = await amenityModel.find({ _id: { $in: amenities } });
    const housePh = await housePhotoModel.findOne({ _id: housePhotos });
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

async function myHouses(req, res) {
  try {
    const { user } = req;
    if (req.authenticated) {
      const houses = await houseModel.find({ user });
      res.json(houses);
    } else {
      res.status(401).json({ error: 'Unauthorized. please logIn to continue' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteHouse(req, res) {
  try {
    const { houseId } = req.params;
    const { user } = req;

    const house = await houseModel.findOne({ _id: houseId });
    if (house) {
      if (house.user.toString() === user) {
        await house.deleteOne();
        res.json({ success: 'house was deleted succefully' });
      } else {
        res.status(403).json({ error: 'Forbidden, You are not the owner of the house' });
      }
    } else {
      res.status(404).json({ error: 'Unknown house, no house was deleted' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}
async function putHouse(req, res) {
  const { houseId } = req.params;
  const {
    name, description, numberOfRooms, maxGuest,
    pricePerNight, amenities,
    sharedBetween, housePhotos, reservedBy,
  } = req.body;
  try {
    const { user } = req;
    const theHouse = await houseModel.findOne({ _id: houseId });
    if (theHouse) {
      if (theHouse.user.toString() === user) {
        const amenityList = await amenityModel.find({ _id: { $in: amenities } });
        const housePh = await housePhotoModel.findOne({ _id: housePhotos });
        theHouse.name = name || theHouse.name;
        theHouse.description = description || theHouse.description;
        theHouse.numberOfRooms = numberOfRooms || theHouse.numberOfRooms;
        theHouse.maxGuest = maxGuest || theHouse.maxGuest;
        theHouse.pricePerNight = pricePerNight || theHouse.pricePerNight;
        theHouse.amenities = amenityList || theHouse.amenities;
        theHouse.sharedBetween = sharedBetween || theHouse.sharedBetween;
        theHouse.housePhotos = housePh || theHouse.housePhotos;
        theHouse.reservedBy = reservedBy || theHouse.reservedBy;
        await theHouse.validate();
        const house = await theHouse.save();
        res.status(201).json({ house });
      } else {
        res.status(403).json({ error: 'Forbidden, You are not the owner of the house' });
      }
    } else {
      res.status(404).json({ error: 'page Not found' });
    }
  } catch (e) {
    const errors = houseErrorHandler(e);
    res.status(500).json({ errors });
  }
}

module.exports = {
  postHouse, allHouses, getHouse, myHouses, deleteHouse, putHouse,
};
