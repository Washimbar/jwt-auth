const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./src/db/connectionDB");
dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use("/", (req, res) => {
	res.status(200).json({
		message: "server established",
	});
});

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
