const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || '';

function generateJWT(user) {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };

    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = generateJWT;
