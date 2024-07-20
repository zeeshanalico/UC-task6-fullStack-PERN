
const path = require('path');
const express = require('express');
const generateUniqueID = require('../utils/getRandomValue.js')
const connectToPostgres = require('../Connection/postgresConnection.js');
const router = express.Router();


const db = connectToPostgres();

// console.log(path.dirname(require.main.filename));//absolute path
// console.log(require.main.path);//absolute path
// console.log(require.main);//absolute path

//create item
router.post('/items', async (req, res) => {
    console.log('/create');
    const { title, duration, link } = req.body
    if (!title || !duration || !link) {
        res.send({ success: false, message: 'Please fill all the fields' })
    } else {
        const query = 'insert into items_list(id, title, duration, link) values ($1,$2,$3,$4)';
        await db.query(query, [generateUniqueID(), title, duration, link], (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).send({ success: false, message: err.detail })
            } else {
                // console.log(result);
                res.status(200).send({ success: true, message: 'item created successfuly' })
            }
        })
    }
})

//get all items with query param show/hide
router.get('/items', async (req, res) => {
    console.log('/getAll');
    const { status } = req.query;//hide | show
    let query;
    let queryParams;

    if (status) {
        query = 'SELECT * FROM items_list WHERE status = $1';
        queryParams = [status];
    } else {
        query = 'SELECT * FROM items_list';
        queryParams = [];
    }
    await db.query(query, queryParams, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send({ success: false, message: err.detail })
        } else {
            // console.log(result);
            res.status(200).send(result.rows)
        }
    })
})

//get item by id
router.get('/items/:id', async (req, res) => {
    console.log('/get:id');
    const id = req.params.id;
    const query = `select * from items_list where id = $1`;
    await db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send({ success: false, message: err.detail })
        } else {
            console.log(result);
            res.status(200).send(result.rows)
        }
    })
})

//update the item by
router.put('/items/:id', async (req, res) => {
    console.log('/put');
    const id = req.params.id;
    const { title, duration, link } = req.body
    const query = 'update items_list set title=$2, duration=$3, link=$4 where id = $1';
    await db.query(query, [id, title, duration, link], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send({ success: false, message: err.detail })
        } else {
            console.log(result);
            if (result.rowCount > 0) {
                res.status(200).send({ success: true, message: 'item updated successfuly' })
            } else {
                res.status(200).send({ success: true, message: 'No row was updated.' })
            }
        }
    })
})

//delete the item
router.delete('/items/:id', async (req, res) => {
    console.log('/delete');

    const id = req.params.id;
    const query = 'delete from  items_list where id = $1';
    await db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send({ success: false, message: err.detail })
        } else {
            if (result.rowCount > 0) {
                res.status(200).send({ success: true, message: 'item deleted successfuly' })
            } else {
                res.status(200).send({ success: true, message: 'No row was deleted.' })
            }
        }
    })
})

router.patch('/items/:id', async (req, res) => {
    console.log('/shift');
    const id = req.params.id;
    const { status = 'show-to-hide' } = req.body; // 'hide-to-show' | 'show-to-hide'
    let query;
    if (status == 'show-to-hide') {
        query = "update items_list set status='hide' where id = $1";
    } else if (status == 'hide-to-show') {
        query = "update items_list set status = 'show' where id = $1";
    }
    await db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send({ success: false, messge: err.detail })
        } else {
            console.log(result);
            if (result.rowCount > 0) {
                res.status(200).send({ success: true, message: `item moved successfuly from ${status}` })
            } else {
                res.status(200).send({ success: true, message: 'No status is updated.' })
            }
        }
    })


});

module.exports.crudRoutes = router;