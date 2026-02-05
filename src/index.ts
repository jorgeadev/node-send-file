// Load environment variables FIRST before any other imports
import "dotenv/config";

import express, { Application } from "express";
import connectDB from "./config/db";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";

// Create server
const app: Application = express();

// Connect to database
connectDB();

// App port
const port: number = parseInt(process.env.PORT || "4000", 10);

// Enable express.json
app.use(express.json());

// App routes
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// Launch server
app.listen(port, "0.0.0.0", () => {
	console.log(`Server running on port ${port}. Visit http://localhost:${port}/`);
});
