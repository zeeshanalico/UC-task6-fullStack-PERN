const express = require('express');
const router = express.Router()
const { createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem,
    changeStatus, } = require('../controller/items_C.js')

module.exports = (db) => {
    router.post('/', createItem(db))
    router.get('/', getItems(db))
    router.get('/:id', getItem(db))
    router.put('/:id', updateItem(db))
    router.delete('/:id', deleteItem(db))
    router.patch('/:id', changeStatus(db));
    return router;
}
