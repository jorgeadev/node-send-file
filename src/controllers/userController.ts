import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export const newUser = async (req: Request, res: Response): Promise<void> => {
	// Show error messages from express-validator
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
		return;
	}

	// Verify if user is already registered
	const { email, password } = req.body;
	let user = await User.findOne({ email });
	if (user) {
		res.status(400).json({ msg: "User already exists" });
		return;
	}

	// Create a new user
	user = new User(req.body);
	// Hash password
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(password, salt);

	// Save the user
	try {
		await user.save();
		res.json({ msg: "User created successfully!" });
	} catch (err) {
		console.log(err);
		res.status(400).json({ msg: "Error saving user to database" });
	}
};
