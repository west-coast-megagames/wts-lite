const express = require('express'); // Import of Express web framework
const { loadDB } = require('../../scripts/loadProgram');
const router = express.Router(); // Destructure of HTTP router for server


// @route   PATCH api/post/loadAll
// @desc    Delete All posts
// @access  Public
router.patch('/loadAll', async function (req, res) {
	await loadDB();
	// console.log(data);
	return res.status(200).send(`We wiped out ${data.deletedCount} posts!`);
});

module.exports = router;