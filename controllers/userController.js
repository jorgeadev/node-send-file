const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.newUser = async (req, res) => {
	// show error messages from express-validator
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// verify if user is already registered
	const { email, password } = req.body;
	let user = await User.findOne({ email });
	if (user) {
		return res.status(400).json({ msg: 'User already exists' });
	}

	// Create a new user
	user = new User(req.body);
	// hash password
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(password, salt);

	// Save the user
	await user.save((err, user) => {
		if (err) {
			return res.status(400).json({
				msg: 'Error saving user to database',
			});
		}
		// Hide the salt and hashed_password from the response
		user.salt = undefined;
		user.hashed_password = undefined;
		res.json({ msg: "User created successfully!" });
	});
}
