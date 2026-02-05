import express, { Router } from "express";
import { check } from "express-validator";
import { authenticatedUser, userAuthenticated } from "../controllers/authController";

const router: Router = express.Router();

router.post(
	"/",
	// Validate fields with express-validator
	[
		check("email", "Add a valid email").isEmail(),
		check("password", "Password must be at least 6 characters").isLength({ min: 6 })
	],
	// Authenticate user
	authenticatedUser
);

router.get("/", userAuthenticated);

export default router;
