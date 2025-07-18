const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server

const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging
const validateObjectId = require('../../middleware/util/validateDocument'); // Middleware that validates object ID's in HTTP perameters
const httpErrorHandler = require('../../middleware/util/throwHTTPError'); // Middleware that parses errors and status for Express responses

// Mongoose Model Import
const { Comment } = require('../../models/comment');

// @route   GET api/comment
// @Desc    Get all Comments
// @access  Public
router.get('/', async function (req, res) {
	logger.info('GET Route: api/comment requested...');

	try {
		const comments = await Comment.find()
			.sort({ post: 1 })
			.populate('user')
            .populate('comments')
		res.status(200).json(comments);
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});

// @route   GET api/comment/:key/:value
// @Desc    Get by property
// @access  Public
router.get('/:key/:value', async (req, res) => {
	logger.info('GET Route: api/comment key value requested...');
	const query = {};
	query[req.params.key] = req.params.value;

	try {
		const comment = await Comment.find(query).sort({ post: 1 });
		res.status(200).json(comment);
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});

// @route   GET api/comment/:id
// @Desc    Get all single comment
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
	logger.info('GET Route: api/comment/:id requested...');
	const id = req.params.id;

	try {
		const comment = await Comment.findById(id);
		if (comment != null) {
			res.status(200).json(comment);
		}
		else {
			nexusError(`The comment with the ID ${id} was not found!`, 404);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// TODO: Add GET route that allows for getting by discriminator

// @route   POST api/comment
// @Desc    Post a new comment
// @access  Public
router.post('/', async (req, res) => {
	logger.info('Comment Route: api/comment call made...');

	try {

		let newComment = new Comment(req.body);
		
	    logger.info(`comment ${req.body.name} has invalid type ${req.body.type}`);

		newComment = await newComment.save();
		logger.info(`comment ${newComment.name} created...`);
		res.status(200).json(newComment);
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   DELETE api/comment/:id
// @Desc    Delete a comment
// @access  Public
router.delete('/:id', validateObjectId, async (req, res) => {
	logger.info('DEL Route: api/comment/:id call made...');
	const id = req.params.id;

	try {
		const comment = await Comment.findByIdAndRemove(id);

		if (comment != null) {
			logger.info(`comment $ Comment.name} with the id ${id} was deleted!`);
			res.status(200).json(comment).send(`comment $ Comment.name} with the id ${id} was deleted!`);
		}
		else {
			nexusError(`No comment with the id ${id} exists!`, 404);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   PATCH api/comment/deleteAll
// @desc    Delete All comments
// @access  Public
router.patch('/deleteAll', async function (req, res) {
	const data = await Comment.deleteMany();
	// console.log(data);
	return res.status(200).send(`We wiped out ${data.deletedCount} comments!`);
});

module.exports = router;