module.exports = (req, res, next) => {
    const { email } = req.body;
    const validateEmail = /\S+@\S+\.\S+/;
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!validateEmail.test(email)) {
        return res.status(400).json({
            message: 'O campo "email" deve ter o formato "email@email.com"',
        });
    }

    next();
};