const express = require('express');
const router = express.Router();
const { login, signup, decodeToken } = require('../controller/auth_C.js')

module.exports = (db) => {
    router.post('/signup', signup(db))
    router.post('/login', login(db))
    router.post('/decodetoken', decodeToken(db))
    return router;
}