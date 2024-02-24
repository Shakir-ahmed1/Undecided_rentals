const { Router } = require('express');
const {
  postHouse, allHouses, getHouse, myHouses, deleteHouse, putHouse,
} = require('../controllers/houseController');

const routes = Router();
// swagger documentation
/**
 * @openapi
 * components:
 *   schemas:
 *     House:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the house.
 *         user:
 *           type: string
 *           description: owner ID.
 *         name:
 *           type: string
 *           description: house name.
 *         description:
 *           type: string
 *           description: description of the house.
 *         numberOfRooms:
 *           type: number
 *           description: Rooms count.
 *         maxGuest:
 *           type: number
 *           description: maximum guest capacity.
 *         pricePerNight:
 *           type: number
 *           description: price per night.
 *         location:
 *           type: string
 *           description: location ID.
 *         amenities:
 *           type: array
 *           description: array of amenity IDs.
 *           items:
 *             type: string
 *         sharedBetween:
 *           type: number
 *           description: how many people are renting in the same house.
 *         housePhotos:
 *           type: array
 *           description: the list of paths to the house images.
 *           items:
 *             type: string
 *         reservedBy:
 *           type: string
 *           description: null if not rented, userId of the renter if rented.
 *       required:
 *         - _id
 *         - user
 *         - name
 *         - description
 *         - numberOfRooms
 *         - maxGuest
 *         - pricePerNight
 *         - location
 *         - amenities
 *         - sharedBetween
 *         - housePhotos
 *         - reservedBy
 */

/**
 * @openapi
 * /api/houses:
 *   post:
 *     summary: Create a house
 *     description: Create a new house.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: owner ID.
 *               name:
 *                 type: string
 *                 description: house name.
 *               description:
 *                 type: string
 *                 description: description of the house.
 *               numberOfRooms:
 *                 type: number
 *                 description: Rooms count.
 *               maxGuest:
 *                 type: number
 *                 description: maximum guest capacity.
 *               pricePerNight:
 *                 type: number
 *                 description: price per night.
 *               location:
 *                 type: string
 *                 description: location ID.
 *               amenities:
 *                 type: array
 *                 description: array of amenity IDs.
 *                 items:
 *                   type: string
 *               sharedBetween:
 *                 type: number
 *                 description: how many people are renting in the same house.
 *               housePhotos:
 *                 type: array
 *                 description: the list of paths to the house images.
 *                 items:
 *                   type: string
 *               reservedBy:
 *                 type: string
 *                 description: null if not rented, userId of the renter if rented.
 *     responses:
 *       201:
 *         description: house creation was successful.
 *       400:
 *         description: Bad request, creation of a house failed.
 */
routes.post('/houses', postHouse);

/**
 * @openapi
 * /api/houses:
 *   get:
 *     summary: Get all houses
 *     description: Retrieve a list of all houses in the database.
 *     responses:
 *       200:
 *         description: A list of houses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/House'
 *       500:
 *         description: Internal server error.
 */
routes.get('/houses', allHouses);
/**
 * @openapi
 * /api/houses/{houseId}:
 *   get:
 *     summary: Get a house by ID.
 *     description: Retrieve a house by the house ID.
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         description: The house ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A house.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/House'
 *       404:
 *         description: house with the given houseId could not be found.
 */
routes.get('/houses/:houseId', getHouse);
// routes.get('/houses', myHouses);
// routes.put('/houses/:houseId', putHouse);
routes.delete('/houses/:houseId', deleteHouse);

module.exports = routes;
