const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./src/db/connectionDB");
const userRoute = require("./src/routes/userRoute");
dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/user", userRoute);

const start = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(error.message);
	}
};

start();
