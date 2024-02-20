const { Router } = require('express');
const { postLocation, getLocation, allLocations } = require('../controllers/locationController');
const router = Router();

router.post('/location', postLocation);
router.get('/location/:locationId', getLocation);
router.get('/location', allLocations);


module.exports = router;