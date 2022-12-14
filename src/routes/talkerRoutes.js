const express = require('express');
const { reader, writer } = require('../utils/readWrite');

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

talkerRoutes.post('/talker', async (req, res) => {
    const { name, age, talk } = req.body;
    await writer({ name, age, talk });
    const talkers = await reader();
    res.status(201).json(talkers.at(-1));
});

module.exports = talkerRoutes;