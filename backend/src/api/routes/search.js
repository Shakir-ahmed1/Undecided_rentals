const { Router } = require('express');
const { postSearch } = require('../controllers/searchController');

const routes = Router();

/**
 * @openapi
 * /api/search:
 *   post:
 *     tags:
 *       - Search
 *     summary: Search houses
 *     description: Search houses by location and price range.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userLat:
 *                 type: number
 *                 description: user's location starting reference in latitude.
 *               userLon:
 *                 type: number
 *                 description: user's location starting reference in longitude.
 *               country:
 *                 type: string
 *                 description: the country.
 *               city:
 *                 type: string
 *                 description: the city.
 *               maxPrice:
 *                 type: number
 *                 description: maximum pricePreNight.
 *               minPrice:
 *                 type: number
 *                 description: minimum pricePerNight.
 *               radiusInMeters:
 *                 type: number
 *                 description: the search readius for houses.
 *               minNumberOfRooms:
 *                 type: number
 *                 description: minimum nnumber of rooms.
 *               maxNumberOfRooms:
 *                 type: number
 *                 description: maximum number of rooms.
 *               minGuests:
 *                 type: number
 *                 description: minimum number of guests
 *               maxGuests:
 *                 type: number
 *                 description: maximum number of guests.
 *               minSharedBetween:
 *                 type: number
 *                 description: the maximum amount of people sharing the house.
 *               maxSharedBetween:
 *                 type: number
 *                 description: the minimum amount of people sharing the house.
 *     responses:
 *       200:
 *         description: searching was successful.
 *       500:
 *         description: Something went wrong.
 */
routes.post('/search', postSearch);

module.exports = routes;
