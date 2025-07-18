const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server

const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging
const validateObjectId = require('../../middleware/util/validateDocument'); // Middleware that validates object ID's in HTTP perameters
const httpErrorHandler = require('../../middleware/util/throwHTTPError'); // Middleware that parses errors and status for Express responses

// Mongoose Model Import
const { Post } = require('../../models/post');

// @route   GET api/post
// @Desc    Get all Posts
// @access  Public
router.get('/', async function (req, res) {
	logger.info('GET Route: api/posts requested...');

	try {
		const posts = await Post.find()
			.sort({ post: 1 })
			.populate('author')
			.populate('team')
			// .populate('comments')
			// .populate({ path: "comments", populate: { path: 'author' }})
			// .populate({ path: "comments", populate: { path: 'team' }})
		res.status(200).json(posts);
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});

// @route   GET api/post/:key/:value
// @Desc    Get by property
// @access  Public
router.get('/:key/:value', async (req, res) => {
	logger.info('GET Route: api/post key value requested...');
	const query = {};
	query[req.params.key] = req.params.value;

	try {
		const post = await Post.find(query).sort({ post: 1 });
		res.status(200).json(post);
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});

// @route   GET api/post/:id
// @Desc    Get all single post
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
	logger.info('GET Route: api/post/:id requested...');
	const id = req.params.id;

	try {
		const post = await Post.findById(id);
		if (post != null) {
			res.status(200).json(post);
		}
		else {
			nexusError(`The post with the ID ${id} was not found!`, 404);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// TODO: Add GET route that allows for getting by discriminator

// @route   POST api/post
// @Desc    Post a new post
// @access  Public
router.post('/', async (req, res) => {
	logger.info('POST Route: api/post call made...');

	try {

		let newPost = new Post(req.body)
		
	    logger.info(`post ${req.body.name} has invalid type ${req.body.type}`);

		newPost = await newPost.save();
		logger.info(`post ${newPost.name} created...`);
		res.status(200).json(newPost);
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   DELETE api/post/:id
// @Desc    Delete a post
// @access  Public
router.delete('/:id', validateObjectId, async (req, res) => {
	logger.info('DEL Route: api/post/:id call made...');
	const id = req.params.id;

	try {
		const post = await Post.findByIdAndRemove(id);

		if (post != null) {
			logger.info(`post ${Post.name} with the id ${id} was deleted!`);
			res.status(200).json(post).send(`post ${Post.name} with the id ${id} was deleted!`);
		}
		else {
			nexusError(`No post with the id ${id} exists!`, 404);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   PATCH api/post/deleteAll
// @desc    Delete All posts
// @access  Public
router.patch('/deleteAll', async function (req, res) {
	const data = await Post.deleteMany();
	// console.log(data);
	return res.status(200).send(`We wiped out ${data.deletedCount} posts!`);
});

module.exports = router;