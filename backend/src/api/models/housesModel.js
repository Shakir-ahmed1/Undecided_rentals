const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'please enter name of city'],
    maxlength: [80, 'city must be under 80 characters'],
  },

  city: {
    type: String,
    required: [true, 'please enter name of city'],
    maxlength: [80, 'city must be under 80 characters'],
  },

  latitude: {
    type: Number,
    required: [true, 'latitude is required'],
  },

  longitude: {
    type: Number,
    required: [true, 'longitude is required'],
  },

});

const housePhotoSchema = new mongoose.Schema({
  fileName: {
    type: [String], // array of string
    required: [true, 'please enter at least one image'],
  },
});

const amenitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter an amenity'],
    unique: true,
    maxlength: [80, 'amenity name can not be more than 80 characters'],
  },
});

const houseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'a house must have an Owner'],
  },

  name: {
    type: String,
    required: [true, 'please enter a name for the house'],
    maxlength: [80, 'house must be under 80 characters'],

  },

  description: {
    type: String,
    required: [true, 'please enter description'],
    maxlength: [1024, 'city must be under 80 characters'],
  },

  numberOfRooms: {
    type: Number,
    required: [true, 'enter number of rooms'],
    min: [1, ' the house must have atleast 1 room'],
  },

  maxGuest: {
    type: Number,
    required: [true, 'please enter Maximum Guest'],
    min: [1, 'the house must accomodate atleast 1 guest'],
  },

  pricePerNight: {
    type: Decimal128,
    required: [true, 'please enter price per night'],
    min: mongoose.Types.Decimal128.fromString('0.00'),
  },

  location: locationSchema,

  amenities: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amenity' }],
    default: [],
  },

  sharedBetween: {
    type: Number,
    default: 1,
    min: [1, 'house must accomodate at least 1 individual'],
  },

  housePhotos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HousePhoto',
  },

  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
});

const locationModel = mongoose.model('Location', locationSchema);
const housePhotoModel = mongoose.model('HousePhoto', housePhotoSchema);
const amenityModel = mongoose.model('Amenity', amenitySchema);
const houseModel = mongoose.model('House', houseSchema);

module.exports = {
  locationModel, housePhotoModel, amenityModel, houseModel,
};
