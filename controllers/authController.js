const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
require('dotenv').config({ path: '.env' });

exports.authenticatedUser = async (req, res, next) => {
	// show error messages from express-validator
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// search for user in db by email
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	console.log(user);
	if (!user) {
		res.status(401).json({ msg: 'User does not exist' });
		return next();
	}

	// check if password is correct and authenticate user
	if (bcrypt.compareSync(password, user.password)) {
		// create JWT
		const token = jwt.sign({
			id: user._id,
			name: user.name,
			email: user.email
		}, process.env.SECRET, {
			expiresIn: '8h'
		});
		res.json({ token });
	} else {
		res.status(401).json({ msg: 'Password is incorrect' });
		return next();
	}
};

exports.userAuthenticated = async (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (authHeader) {
		// get token
		const token = authHeader.split(' ')[1];
		// check if token is valid
		try {
			const user = jwt.verify(token, process.env.SECRET);
			res.json(user);
		} catch (error) {
			console.log(error);
			console.log('JWT not valid');
		}
	}

	return next();
};
