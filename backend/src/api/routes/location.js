const { Router } = require('express');
const {
  postLocation, getLocation, allLocations, deleteLocation,
} = require('../controllers/locationController');

const router = Router();

// swagger documentation
/**
 * @openapi
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the location.
 *         country:
 *           type: string
 *           description: Country name.
 *         city:
 *           type: string
 *           description: City name.
 *         latitude:
 *           type: number
 *           description: The latitude value of the house.
 *         longitude:
 *           type: number
 *           description: The longitude value of the house.
 *       required:
 *         - _id
 *         - country
 *         - city
 *         - latitude
 *         - longitude
 */

/**
 * @openapi
 * /api/location:
 *   post:
 *     summary: Create a Location
 *     description: Create a new location.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country:
 *                 type: string
 *               city:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       201:
 *         description: Location creation was successful.
 *       400:
 *         description: Bad request, creation of a location failed.
 */
router.post('/location', postLocation);

/**
 * @openapi
 * /api/location/{locationId}:
 *   get:
 *     summary: Get a location by ID.
 *     description: Retrieve a location by the location ID.
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         description: The location ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A Location.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location with the given locationId could not be found.
 */
router.get('/location/:locationId', getLocation);

/**
 * @openapi
 * /api/location:
 *   get:
 *     summary: Get all locations
 *     description: Retrieve a list of all locations in the database.
 *     responses:
 *       200:
 *         description: A list of locations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       500:
 *         description: Internal server error.
 */
router.get('/location', allLocations);

/**
 * @openapi
 * /api/location/{locationId}:
 *   delete:
 *     summary: Delete a location by ID
 *     description: Delete a location by the location ID.
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         description: The location ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A Location has been deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location with the locationId could not be found.
 */
router.delete('/location/:locationId', deleteLocation);

module.exports = router;
