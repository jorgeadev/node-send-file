import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(process.env.DB_URL as string);
		console.log("DB connected");
	} catch (error) {
		console.log("An error occurred");
		console.log(error);
		process.exit(1);
	}
};

export default connectDB;
