const express = require('express');
const tokenGenerator = require('../utils/tokenGenerator');
const checkEmail = require('../middlewares/checkEmail');
const checkPassword = require('../middlewares/checkPassword');

const loginRoutes = express.Router();

loginRoutes.post('/login', checkEmail, checkPassword, (_req, res) => {
    const token = tokenGenerator();
    res.status(200).json({ token });
});

module.exports = loginRoutes;