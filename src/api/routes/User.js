const { Router } = require('express');
const { register } = require('../controllers/userController');

router = Router();

router.post('/register', register);

module.exports = router;