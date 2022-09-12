const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('DB connected');
	} catch (error) {
		console.log('An error occurred');
		console.log(error);
		process.exit(1);
	}
}

module.exports = connectDB;
