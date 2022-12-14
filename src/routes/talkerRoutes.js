const express = require('express');
const {reader} = require('../utils/readWrite')


const talkerRoutes = express.Router();

talkerRoutes.get('/talker', async (_req, res) => {
    const talkers = await reader();
    res.status(200).json(talkers);
});

module.exports = talkerRoutes;