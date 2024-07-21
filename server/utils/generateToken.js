const jwt = require('jsonwebtoken');
module.exports = (user) => {
    const payload = { ...user };
    console.log(process.env.SECRET_KEY);
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, process.env.SECRET_KEY, options);
}
