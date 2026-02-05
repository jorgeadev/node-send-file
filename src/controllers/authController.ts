import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const authenticatedUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	// Show error messages from express-validator
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
		return;
	}

	// Search for user in db by email
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	console.log(user);
	if (!user) {
		res.status(401).json({ msg: "User does not exist" });
		return next();
	}

	// Check if password is correct and authenticate user
	if (bcrypt.compareSync(password, user.password)) {
		// Create JWT
		const token = jwt.sign(
			{
				id: user._id,
				name: user.name,
				email: user.email
			},
			process.env.SECRET as string,
			{
				expiresIn: "8h"
			}
		);
		res.json({ token });
	} else {
		res.status(401).json({ msg: "Password is incorrect" });
		return next();
	}
};

export const userAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const authHeader = req.get("Authorization");
	if (authHeader) {
		// Get token
		const token = authHeader.split(" ")[1];
		// Check if token is valid
		try {
			const user = jwt.verify(token, process.env.SECRET as string);
			res.json(user);
		} catch (error) {
			console.log(error);
			console.log("JWT not valid");
		}
	}

	return next();
};
