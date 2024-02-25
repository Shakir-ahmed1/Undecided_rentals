const { Router } = require('express');
const { postSearch } = require('../controllers/searchController');

const routes = Router();

/**
 * @openapi
 * /api/search:
 *   post:
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
 *                 type: number
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
 *     responses:
 *       200:
 *         description: searching was successful.
 *       500:
 *         description: Something went wrong.
 */
routes.post('/search', postSearch);

module.exports = routes;
