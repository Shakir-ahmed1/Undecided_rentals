const { Router } = require('express');
const { getAllProfile, getProfile } = require('../controllers/userProfileController');

const router = Router();

// swagger documentation
/**
 * @openapi
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the profile.
 *         user:
 *           type: string
 *           description: The ID of the user associated with the profile.
 *         bio:
 *           type: string
 *           description: The biography of the user.
 *         country:
 *           type: string
 *           description: The country of the user.
 *         state:
 *           type: string
 *           description: The state of the user.
 *         houseAddress:
 *           type: string
 *           description: The address of the user's house.
 *       required:
 *         - _id
 *         - user
 */

/**
 * @openapi
 * /api/users/profiles:
 *   get:
 *     summary: Get all user profiles
 *     description: Retrieve a list of all user profiles.
 *     responses:
 *       200:
 *         description: A list of user profiles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       500:
 *         description: Internal server error.
 */
router.get('/profiles', getAllProfile);

/**
 * @openapi
 * /api/users/{userId}/profiles:
 *   get:
 *     summary: Get a user profile by ID
 *     description: Retrieve a user profile by the user's ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user profile.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Invalid user ID.
 *       404:
 *         description: Profile with the user ID not found.
 */
router.get('/:userId/profiles', getProfile);

module.exports = router;
