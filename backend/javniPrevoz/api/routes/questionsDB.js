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

const myQuestion = bookshelf.Model.extend({
    tableName: 'questions',
    idAttribute: 'id'
});

const myQuestionReply = bookshelf.Model.extend({
    tableName: 'questionReply',
    idAttribute: 'tk_id_question'
});


/* GET Questions table. */

router.get('/', async function(req, res, next) {
    try {
        const questions = await new myQuestion().fetchAll();
        res.json(questions.toJSON());
    } catch (error) {
        res.status(500).json({ status: "error", error: error });
    }
});

router.post('/', async(req, res, next) => {
    try {
        let question = req.body;
        console.log(question);
        const add = await new myQuestion().save(question);
        res.json({ status: "added" });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', async(req, res, next) => {
    try {

        let id = req.params.id;
        await new myQuestion({ id: id }).destroy();
        res.json({ status: "deleted" });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const question = await new myQuestion().where('id', id).fetch();
        question.
        res.json(question.toJSON());
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;