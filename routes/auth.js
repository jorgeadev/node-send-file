const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

router.post('/',
	// validate fields with express-validator
	[
		check('email', 'Add a valid email').isEmail(),
		check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
	],
	// authenticate user
	authController.authenticatedUser
);

router.get('/',
	authController.userAuthenticated
);

module.exports = router;
