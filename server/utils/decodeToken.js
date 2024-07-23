//middleware//get token from body
const jwt = require('jsonwebtoken');

//verify jwt from header
const verifyJWT = (req, res, next) => {
    console.log(req.headers);
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided', success: false, result: null });
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY);
        req.decoded = decoded;
        console.log('Decoded JWT Payload:', decoded);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Forbidden: Invalid or expired token', jwtExpired: true, success: false, result: null });
        } else {
            console.error('Error decoding token:', error);
            return res.status(500).json({ message: 'Internal Server Error', success: false, result: null, error });
        }
    }
};

const getRoles = async db => {
    const query = 'select * from roles';
    try {
        const result = await db.query(query)
        return result.rows;
    } catch (error) {
        return error;
    }
}
const verifyRole = (...allowedRoles) => async (req, res, next) => {
    const { role_id, role } = req.decoded;
    const match = allowedRoles.find(r => r === role);
    if (match) {
        console.log('matched role is ', match);
        next()
    } else {
        res.status(403).send({ message: 'Forbidden: user is not authorized for this role', result: null, success: false })
    }
}


module.exports = { verifyJWT, verifyRole }