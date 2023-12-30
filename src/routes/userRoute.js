const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = require("../schemas/userSchema");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();
const User = new mongoose.model("User", userSchema);

router.post("/signup", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = User({
			name: req.body.name,
			userName: req.body.userName,
			password: hashedPassword,
		});
		newUser.save();
		console.log(req.body);
		res.status(200).json({
			message: "User signup successfully",
		});
	} catch (error) {
		res.status(500).json({ error: "Signup failed!" });
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.find({
			userName: req.body.userName,
		});
		if (user.length > 0) {
			isValidPassword = await bcrypt.compare(
				req.body.password,
				user[0].password
			);
			if (isValidPassword) {
				const token = jwt.sign(
					{
						userName: user[0].userName,
						userId: user[0]._id,
					},
					process.env.JWT_SECRET,
					{
						expiresIn: "1h",
					}
				);
				res.status(200).json({
					token: token,
					message: "User login successfully",
				});
			}
		} else {
			res.status(401).json({ error: "Login failed!" });
		}
	} catch (error) {
		res.status(500).json({ error: "Login failed!" });
	}
});

module.exports = router;
