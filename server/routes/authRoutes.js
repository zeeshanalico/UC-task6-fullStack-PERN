const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const generateUniqueID = require('../utils/getRandomValue.js')
const generateToken = require('../utils/generateToken.js')

module.exports = (db) => {

    const getUser = async (email) => {
        try {
            const result = await db.query('SELECT u.id, u.username,u.password, u.email, r.id as role_id, r.user_role as role\
                                                FROM users u\
                                                INNER JOIN roles r ON u.role_id = r.id\
                                                WHERE u.email = $1;', [email]);
            return result.rows[0]
        } catch (err) {
            console.error(err);
        }
    };

    router.post('/signup', async (req, res) => {
        console.log('/signup');
        const { role_id = 1, username, password, email } = req.body//default role will be ADMIN
        if (!username.trim() || !password.trim() || !email.trim()) {
            res.status(400).send({ success: false, message: 'Please fill all the fields', success: false, result: null })//400:bad request
        } else {
            const user = await getUser(email);
            if (user) {
                res.send({ message: 'User already exist with this email', success: false, result: null })
                return;

            }
            const saltRounds = 10;
            const hashed_password = await bcrypt.hash(password, saltRounds);
            const query = 'insert into users(id,username, email, password,role_id) values ($1,$2,$3,$4,$5)';
            await db.query(query, [generateUniqueID(), username, email, hashed_password, role_id], (err, result) => {
                if (err) {
                    console.error('Error executing query', err);
                    res.status(500).send({ success: false, message: 'Internal Server Error', result: null, error: err })
                } else {
                    res.status(200).send({ success: true, message: 'User registered successfuly', result: null, })
                }
            })
        }
    })
    router.post('/login', async (req, res) => {
        console.log('/login');
        const { password, email } = req.body
        if (!password.trim() || !email.trim()) {
            res.send({ success: false, message: 'Email or password is missing' })
        }
        try {
            const user = await getUser(email);
            console.log(user);
            if (user) {//undefined|{, ,}
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ message: 'error at Server', success: false, result: null, error: err });
                    }
                    else if (result) {
                        const token = generateToken(user);
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
    })

    router.post('/decodetoken', (req, res) => {
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

    })
    return router;
}