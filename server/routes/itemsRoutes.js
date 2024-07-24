const express = require('express');
const router = express.Router()
const { createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem,
    changeStatus, } = require('../controller/items_C.js')
const { verifyRole } = require('../utils/decodeToken.js')

module.exports = (db) => {
    router.post('/', verifyRole( "ADMIN", 'CREATOR'),  createItem(db))
    router.get('/', verifyRole( "ADMIN", 'CREATOR', 'EDITOR'), getItems(db))
    router.get('/:id', verifyRole( "ADMIN", 'CREATOR', 'EDITOR'), getItem(db))
    router.put('/:id', verifyRole( "ADMIN", 'EDITOR'), updateItem(db))
    router.delete('/:id', verifyRole( "ADMIN"), deleteItem(db))
    router.patch('/:id', verifyRole( "ADMIN", 'CREATOR', 'EDITOR'), changeStatus(db));
    return router;
}
