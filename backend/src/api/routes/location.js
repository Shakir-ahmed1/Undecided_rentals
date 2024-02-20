const { Router } = require('express');
const { postLocation, getLocation, allLocations, deleteLocation } = require('../controllers/locationController');
const router = Router();

router.post('/location', postLocation);
router.get('/location/:locationId', getLocation);
router.get('/location', allLocations);
router.delete('/location/:locationId', deleteLocation)


module.exports = router;