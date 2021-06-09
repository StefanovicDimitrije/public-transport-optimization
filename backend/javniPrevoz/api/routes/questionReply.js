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

const myQuestionReply = bookshelf.Model.extend({
    tableName: 'questionReply',
    idAttribute: 'id'
});
const myQuestion = bookshelf.Model.extend({
    tableName: 'question',
    idAttribute: 'id'
});
const myUsers = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'id'
});

/* GET Questions table. */

router.get('/', async function(req, res, next) {
    try {
        const questionReply = await new myQuestionReply().fetchAll();
        res.json(questionReply.toJSON());
    } catch (error) {
        res.status(500).json({ status: "error", error: error });
    }
});
router.get('/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        const questionReply = await new myQuestionReply().where('tk_id_question', id).fetchAll();
        res.json(questionReply.toJSON());
    } catch (error) {
        res.status(500).json({ status: "error", error: error });
    }
});

router.post('/', async(req, res, next) => {
    try {
        let questionReply = req.body;
        console.log(questionReply);
        await new myQuestionReply().save(questionReply);
        res.json({ status: "added" });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        let pera = req.params.id;
        await new myQuestionReply({ id: pera }).destroy();
        res.json({ status: "deleted" });
    } catch (error) {
        res.status(500).json(error);
    }
});


router.put('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const questionReply = await new myQuestionReply().where('id', id).fetch();
        questionReply.
        res.json(questionReply.toJSON());
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;