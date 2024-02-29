const Router = require('express');
const {
  postReview, getReview, allReview, deleteReview, houseReview,
} = require('../controllers/reviewController');
const { requireAuth } = require('../middelware/jwt');

const routes = Router();

// swagger documentation
/**
 * @openapi
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the review.
 *         user:
 *           type: string
 *           description: ID of the reviewr.
 *         house:
 *           type: string
 *           description: ID of the house being reviewed.
 *         text:
 *           type: string
 *           description: The review content.
 *       required:
 *         - _id
 *         - user
 *         - house
 *         - text
 */

/**
 * @openapi
 * /api/reviews/{houseId}:
 *   post:
 *     summary: Create a Review
 *     description: Create a new review for a house (log in required).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         description: The house ID.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Review creation was successful.
 *       400:
 *         description: Bad request, creation of a review failed, or can't review your own house.
 *       404:
 *         description: Page not found, the house specified doesn't exist.
 */
routes.post('/reviews/:houseId', requireAuth, postReview);

/**
 * @openapi
 * /api/reviews:
 *   get:
 *     summary: Get all reviews.
 *     description: Retrieve a every review in the database.
 *     responses:
 *       200:
 *         description: All Reviews.
 *       500:
 *         description: Something went wrong.
 */
routes.get('/reviews', allReview);

/**
 * @openapi
 * /api/reviews/houses/{houseId}:
 *   get:
 *     summary: Get reviews for a house.
 *     description: Retrieve all reviews for the  house.
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         description: The house ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of reviews for the house
 *       404:
 *         description: Page not found, house with the given houseId could not be found.
 *       500:
 *         description: Something went wrong.
 */
routes.get('/reviews/houses/:houseId', requireAuth, houseReview);

/**
 * @openapi
 * /api/reviews/{reviewId}:
 *   get:
 *     summary: Get a review by ID.
 *     description: Retrieve a review by the review ID.
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: The review ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A Review.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Page not found, Review with the given reviewId could not be found.
 *       500:
 *         description: Something went wrong.
 */
routes.get('/reviews/:reviewId', getReview);

/**
 * @openapi
 * /api/reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review by ID
 *     description: Delete a review by the review ID.
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: The review ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A Review has been deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review with the reviewId could not be found.
 */
routes.delete('/reviews/:reviewId', requireAuth, deleteReview);

module.exports = routes;
