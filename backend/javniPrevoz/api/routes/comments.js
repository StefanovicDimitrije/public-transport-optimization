const express = require('express');
const path = require('path');
var router = express.Router();

//DATABASE CONNECTIONS
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'javniprevoz'
    }
});

const bookshelf = require('bookshelf')(knex);


const myComments = bookshelf.Model.extend({
    tableName: 'comments',
    idAttribute: 'id'
});

/* GET comments table. */

router.get('/', async function(req, res, next) {
    try {
        const comments = await new myComments().fetchAll();
        res.json(comments.toJSON());
    } catch (error) {
        res.status(500).json({ status: "error", error: error });
    }
});

router.post('/', async(req, res, next) => {
    try {
        let comments = req.body;
        console.log(comments);
        const add = await new myComments().save(comments);
        res.json({ status: "added" });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        await new myComments({ id: id }).destroy();
        res.json({ status: "deleted" });
    } catch (error) {
        res.status(500).json(error);
    }
});




module.exports = router;