module.exports = (req, res, next) => {
    const { talk: { rate } } = req.body;
    const MIN_RATE = 1;
    const MAX_RATE = 5;
    if (!rate) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!Number.isInteger(rate) || rate < MIN_RATE || rate > MAX_RATE) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }

    next();
};