const { locationModel, houseModel } = require('../models/housesModel');

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371000; // Earth's radius in meters
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(degToRad(lat1))
        * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}

async function postSearch(req, res) {
  const {
    userLon, userLat, country, city, radiusInMeters, maxPrice, minPrice,
  } = req.body;

  try {
    if (userLat && userLon && country && city) {
      const locations = await locationModel.find({ country, city });
      const searchResults = locations.filter((dest) => {
        const distance = calculateDistance(userLat, userLon, dest.latitude, dest.longitude);
        // console.log(distance , radiusInMeters);
        return distance <= radiusInMeters;
      });
      const searchLocation = { $in: searchResults || locations };
      const searchPrice = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
      const result = await houseModel.find({
        location: searchLocation,
        pricePerNight: searchPrice,
      });

      res.json(result);
    }
  } catch (e) {
    res.status(500).json({ error: 'something went wrong' });
  }
}

module.exports = { postSearch };
