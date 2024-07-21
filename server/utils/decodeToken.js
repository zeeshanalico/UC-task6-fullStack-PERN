const decodeToken_C = (req, res) => {
    res.send(req.decoded)
}

//middleware//get token from body
const decodeToken = (req, res, next) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided', success: false, result: null });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.decoded = decoded['_doc'];
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Forbidden: Invalid or expired token', success: false, result: null });
        } else {
            console.error('Error decoding token:', error);
            return res.status(500).json({ message: 'Internal Server Error', success: false, result: null });
        }
    }
}
//middleware//get token frome header
const decodeHeader = (req, res, next) => {
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


module.exports = { decodeHeader, decodeToken, decodeToken_C }