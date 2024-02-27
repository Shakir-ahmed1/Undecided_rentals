const { Router } = require('express');
const {
  postAmenity, getAmenity, allAmenities, deleteAmenity,
} = require('../controllers/amenityController');

const routes = Router();

// swagger documentation
/**
 * @openapi
 * components:
 *   schemas:
 *     Amenity:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the amenity.
 *         name:
 *           type: string
 *           description: Amenity name.
 *       required:
 *         - _id
 *         - name
 */

/**
 * @openapi
 * /api/amenities:
 *   post:
 *     summary: Create an amenity
 *     description: Create a new amenity.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Amenity creation was successful.
 *       400:
 *         description: Bad request, creation of amenity failed.
 */
routes.post('/amenities', postAmenity);

/**
 * @openapi
 * /api/amenities/{amenityId}:
 *   get:
 *     summary: Get amenity by ID.
 *     description: Retrieve an amenity by the amenity ID.
 *     parameters:
 *       - in: path
 *         name: amenityId
 *         required: true
 *         description: amenity ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An amenity object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Amenity'
 *       404:
 *         description: The amenity with the given amenityId could not be found.
 */
routes.get('/amenities/:amenityId', getAmenity);

/**
 * @openapi
 * /api/amenities:
 *   get:
 *     summary: Get all amenities
 *     description: Retrieve a list of all amenities in the database.
 *     responses:
 *       200:
 *         description: A list of amenities.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Amenity'
 *       500:
 *         description: Internal server error.
 */
routes.get('/amenities', allAmenities);

/**
 * @openapi
 * /api/amenities/{amenityId}:
 *   delete:
 *     summary: Delete an amenity by ID
 *     description: Delete an amenity by the amenity ID.
 *     parameters:
 *       - in: path
 *         name: amenityId
 *         required: true
 *         description: The amenity ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A amenity has been deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/amenity'
 *       404:
 *         description: amenity with the amenityId could not be found.
 */
routes.delete('/amenities/:amenityId', deleteAmenity);

module.exports = routes;
