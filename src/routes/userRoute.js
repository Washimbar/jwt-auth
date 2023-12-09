const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
	try {
		res.status(200).json({ name: "Washim Bari" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
