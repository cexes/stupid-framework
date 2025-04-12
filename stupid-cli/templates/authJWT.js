const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "";

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is not provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Aqui você já tem o payload completo

   
        if (req.user.role === '' || req.user.role === '') {
            return res.status(403).json({ message: 'Blocked access.' });
        }

        next(); 
    } catch (error) {
        console.log('Error verifying token:', error.message, token);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

module.exports = authMiddleware;
