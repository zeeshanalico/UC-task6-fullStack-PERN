const generateUniqueID = require('../utils/getRandomValue.js');

const createItem = db => (req, res) => {//create(db) is returning callbac(req,res)
    const { title, duration, link } = req.body
    if (!title || !duration || !link) {
        res.send({ success: false, message: 'Please fill all the fields' })
    } else {
        const query = 'insert into items_list(id, title, duration, link) values ($1,$2,$3,$4)';
        db.query(query, [generateUniqueID(), title, duration, link], (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).send({ success: false, message: err.detail })
            } else {
                res.status(200).send({ success: true, message: 'item created successfuly' })
            }
        })
    }
}

const getItems = db => (req, res) => {
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
    db.query(query, queryParams, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send({ success: false, message: err.detail })
        } else {
            // console.log(result);
            res.status(200).send(result.rows)
        }
    })
}

const getItem = db => (req, res) => {
    console.log('/get:id');
    const id = req.params.id;
    const query = `select * from items_list where id = $1`;
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send({ success: false, message: err.detail })
        } else {
            console.log(result);
            res.status(200).send(result.rows)
        }
    })
}

const updateItem = db => (req, res) => {
    console.log('/put');
    const id = req.params.id;
    const { title, duration, link } = req.body
    const query = 'update items_list set title=$2, duration=$3, link=$4 where id = $1';
    db.query(query, [id, title, duration, link], (err, result) => {
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
}

const deleteItem = db => (req, res) => {
    console.log('/delete');

    const id = req.params.id;
    const query = 'delete from  items_list where id = $1';
    db.query(query, [id], (err, result) => {
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
}

const changeStatus = db => (req, res) => {
    console.log('/shift');
    const id = req.params.id;
    const { status = 'show-to-hide' } = req.body; // 'hide-to-show' | 'show-to-hide'
    let query;
    if (status == 'show-to-hide') {
        query = "update items_list set status='hide' where id = $1";
    } else if (status == 'hide-to-show') {
        query = "update items_list set status = 'show' where id = $1";
    }
    db.query(query, [id], (err, result) => {
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
}


module.exports = {
    createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem,
    changeStatus,
}