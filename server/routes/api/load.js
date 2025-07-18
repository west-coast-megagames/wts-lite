const express = require('express'); // Import of Express web framework
const { loadDB } = require('../../scripts/loadProgram');
const router = express.Router(); // Destructure of HTTP router for server


// @route   PATCH api/post/loadAll
// @desc    Delete All posts
// @access  Public
router.patch('/loadAll', async function (req, res) {
	await loadDB();
	return res.status(200).send(`Loaded the Database boss...`);
});

module.exports = router;