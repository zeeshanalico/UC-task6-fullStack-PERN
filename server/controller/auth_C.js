const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const generateUniqueID = require('../utils/getRandomValue.js')

const getUserQuery = `SELECT u.id, u.username,u.password, u.email, r.id as role_id, r.user_role as role 
                    FROM users u INNER JOIN roles r ON u.role_id = r.id WHERE u.email = $1;`
const insertUserQuery = 'insert into users(id,username, email, password,role_id) values ($1,$2,$3,$4,$5)';

const generateJWTtoken = (user) => {//encode user in token
    const payload = { ...user };
    console.log(process.env.SECRET_KEY);
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, process.env.SECRET_KEY, options);
}

const getUser = db => async (email) => {
    try {
        const result = await db.query(getUserQuery, [email]);
        return result.rows[0]
    } catch (err) {
        console.error(err);
    }
};

const signup = db => async (req, res) => {
    console.log('/signup');
    const { role_id = 1, username, password, email } = req.body//default role will be ADMIN
    if (!username.trim() || !password.trim() || !email.trim()) {
        res.status(400).send({ success: false, message: 'Please fill all the fields', success: false, result: null })//400:bad request
    } else {
        const user = getUser(email);
        if (user) {
            res.send({ message: 'User already exist with this email', success: false, result: null })
            return;
        }
        const saltRounds = 10;
        const hashed_password = await bcrypt.hash(password, saltRounds);
        db.query(insertUserQuery, [generateUniqueID(), username, email, hashed_password, role_id], (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).send({ success: false, message: 'Internal Server Error', result: null, error: err })
            } else {
                res.status(200).send({ success: true, message: 'User registered successfuly', result: null, })
            }
        })
    }
}


const login = db => async (req, res) => {
    console.log('/login');
    const { password, email } = req.body
    if ((!password && !password.trim()) || (!email && !email.trim())) {
        res.send({ success: false, message: 'Email or password is missing' })
    }
    try {
        const user = getUser(email);
        console.log(user);
        if (user) {//undefined|{, ,}
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({ message: 'error at Server', success: false, result: null, error: err });
                }
                else if (result) {
                    const token = generateJWTtoken(user);
                    res.status(200).send({ message: 'User Login successfully', success: true, result: { token, user } })
                } else {
                    res.send({ message: 'password doesn\'t match', success: false, result: null });
                }
            });
        }
        else {
            res.send({ message: 'Email not found', success: false, result: null })
        }
    } catch (error) {
        console.log(error);
    }
}

const decodeToken = db => (req, res) => {
    console.log('decodetoken');
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided', success: false, result: null });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);
        res.send({ result: decoded, message: 'token decoded successfull', success: true, })
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Forbidden: Invalid or expired token', success: false, result: null });
        } else {
            console.error('Error decoding token:', error);
            return res.status(500).json({ message: 'Internal Server Error', success: false, result: null });
        }
    }

}

module.exports = { signup, login, decodeToken, getUser }