import express, { Router } from "express";
import { check } from "express-validator";
import { newUser } from "../controllers/userController";

const router: Router = express.Router();

router.post(
	"/",
	// Validate fields with express-validator
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Add a valid email").isEmail(),
		check("password", "Password must be at least 6 characters").isLength({ min: 6 })
	],
	newUser
);

export default router;
