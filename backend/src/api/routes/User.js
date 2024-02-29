const { Router } = require('express');
const { register, login, logout, allUsers } = require('../controllers/userController');

const router = Router();

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registration successful
 *       '400':
 *         description: Bad request, either password mismatch, missing fieild, user not found
 */
router.post('/register', register);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Login with user credentials
 *     description: Authenticate and log in a user using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the user account.
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Bad request, either username or password is incorrect
 */
router.post('/login', login);

/**
 * @openapi
 * /api/users/logout:
 *   post:
 *     summary: Logout the user
 *     description: Log out the currently authenticated user.
 *     responses:
 *       '200':
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logout:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: Message indicating successful logout.
 *                       example: Logout successful
 *       '400':
 *         description: Bad request or error occurred during logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: Error message indicating the reason for failure.
 *       '401':
 *         description: Unauthorized, user not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the user needs to log in first.
 *                   example: Unauthorized
 *                 message:
 *                   type: string
 *                   description: Message indicating that the user needs to log in first.
 *                   example: You are not logged in
 */
router.post('/logout', logout);

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 *       '500':
 *         description: Internal server error
 */
router.get('/', allUsers);

module.exports = router;
