module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const CORRECT_TOKEN_LENGTH = 16;
    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== CORRECT_TOKEN_LENGTH
        || Number.isNaN(authorization)) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    next();
};