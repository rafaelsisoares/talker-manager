const express = require('express');

const loginRoutes = express.Router();

loginRoutes.post('/login', (req, res) => {
    console.log(req.body);
    res.status(200).end();
});

module.exports = loginRoutes;