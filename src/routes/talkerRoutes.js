const express = require('express');
const { reader } = require('../utils/readWrite');

const talkerRoutes = express.Router();

talkerRoutes.get('/talker', async (_req, res) => {
    const talkers = await reader();
    res.status(200).json(talkers);
});

talkerRoutes.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await reader();
    const targetTalker = talkers.find((t) => t.id === +id);
    if (!targetTalker) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(200).json(targetTalker);
});

module.exports = talkerRoutes;