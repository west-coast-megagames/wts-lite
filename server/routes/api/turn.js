const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server

const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging

// Mongoose Model Import
const { Turn } = require('../../models/turns');
const httpErrorHandler = require('../../middleware/util/throwHTTPError');

// @route   GET api/turn
// @Desc    Get latest turn
// @access  Public
router.get('/', async function (req, res) {
    logger.info('GET Route: api/turn requested...');

    try {
        const turns = await Turn.findOne().sort({ createdAt: -1 }).exec();
        res.status(200).json(turns);
    }
    catch (err) {
        logger.error(err.message, { meta: err.stack });
        res.status(500).send(err.message);
    }
});

// @route   GET api/turn/all
// @Desc    Get all turns
// @access  Public
router.get('/all', async function (req, res) {
    logger.info("GET Route: api/turn/all requested...");

    try {
        const turns = await Turn.find({});
        res.status(200).json(turns);
    }
    catch (err) {
        logger.error(err.message, { meta: err.stack });
        res.status(500).send(err.message);
    }
});

// @route   POST api/turn
// @Desc    Add a new turn
// @access  Public
router.post('/', async (req, res) => {
    logger.info('POST Route: api/turn call made...');

    try {
        let newTurn = new Turn(req.body);

        newTurn = await newTurn.save();
        logger.info(`turn ${newTurn} created...`)
        res.status(200).json(newTurn);

    }
    catch (err) {
        httpErrorHandler(res, err);
    }
});

module.exports = router;