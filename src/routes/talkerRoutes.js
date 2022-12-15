const express = require('express');
const checkAge = require('../middlewares/checkAge');
const checkAuthorization = require('../middlewares/checkAuthorization');
const checkName = require('../middlewares/checkName');
const checkRate = require('../middlewares/checkRate');
const checkTalk = require('../middlewares/checkTalk');
const checkWatchedAt = require('../middlewares/checkWatchedAt');
const { reader, writer, update, remove } = require('../utils/readWrite');

const talkerRoutes = express.Router();

talkerRoutes.get('/talker', async (_req, res) => {
  const talkers = await reader();
  res.status(200).json(talkers);
});

talkerRoutes.post(
  '/talker',
  checkAuthorization,
  checkName,
  checkAge,
  checkTalk,
  checkWatchedAt,
  checkRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    await writer({ name, age, talk });
    const talkers = await reader();
    res.status(201).json(talkers[talkers.length - 1]);
  },
);

talkerRoutes.get('/talker/search', async (req, res) => {
  const talkers = await reader();
  const { q } = req.query;
  const targetTalkers = talkers.filter(({ name }) => name.toLowerCase().includes(q));
  res.status(200).json(targetTalkers);
});

talkerRoutes.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await reader();
  const targetTalker = talkers.find((t) => t.id === +id);
  if (!targetTalker) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(targetTalker);
});

talkerRoutes.put(
  '/talker/:id',
  checkAuthorization,
  checkName,
  checkAge,
  checkTalk,
  checkWatchedAt,
  checkRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const updatedTalker = await update({ name, age, talk }, +id);
    res.status(200).json(updatedTalker);
  },
);

talkerRoutes.delete('/talker/:id', checkAuthorization, async (req, res) => {
  const { id } = req.params;
  await remove(+id);
  res.status(204).end();
});

module.exports = talkerRoutes;
