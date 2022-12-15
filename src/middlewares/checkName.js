module.exports = (req, res, next) => {
    const { name } = req.body;
    const MIN_NAME_LENGTH = 3;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < MIN_NAME_LENGTH) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    next();
};