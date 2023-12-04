const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.DATA_BASE_URL);
		if (connect.STATES.connected === 1) {
			console.log("Database connected successfully");
		}
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = connectDB;
