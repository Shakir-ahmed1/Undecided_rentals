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
    default: '',
  },

  longitude: {
    type: Number,
    default: '',
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
    type: [String], // an array of strings
    required: [true, 'please list all amenities'],
  },
});

const houseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  type: {
    type: String,
    required: [true, 'please enter the type of house'],
  },

  description: {
    type: String,
    required: [true, 'please enter description'],
  },

  numberOfRooms: {
    type: Number,
    required: [true, 'enter number of rooms'],
  },

  maxGuest: {
    type: Number,
    required: [true, 'enter Max Guest'],
  },

  price_per_night: {
    type: Decimal128,
    required: [true, 'please enter price per night'],
  },

  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  },

  amenities: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Amenity',
  },

  privateOrShared: {
    type: String,
    required: [true, 'please specify if private or shared'],
  },

  housePhotos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HousePhoto',
  },

  freeOrReserved: {
    type: String,
    required: [true, 'please specify if free or reserved'],
  },
});

const locationModel = mongoose.model('Location', locationSchema);
const housePhotoModel = mongoose.model('HousePhoto', housePhotoSchema);
const amenityModel = mongoose.model('Amenity', amenitySchema);
const houseModel = mongoose.model('House', houseSchema);

module.exports = {
  locationModel, housePhotoModel, amenityModel, houseModel,
};
