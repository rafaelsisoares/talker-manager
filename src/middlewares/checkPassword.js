module.exports = (req, res, next) => {
    const { password } = req.body;
    const MIN_PASSWORD_LENGTH = 6;
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
        return res.status(400).json({
            message: 'O "password" deve ter pelo menos 6 caracteres',
        });
    }

    next();
};