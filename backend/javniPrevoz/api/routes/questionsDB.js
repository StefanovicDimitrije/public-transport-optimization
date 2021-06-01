const express = require('express');
const path = require('path');
var router = express.Router();
// in case you need to use a db for your node part you need to include the following:
const knexfile = require('../../knexfile').development;
const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);

const myQuestion = bookshelf.Model.extend({
    tableName:'questions',
    idAttribute:'id'
});

/* GET Questions table. */

router.get('/',async function(req, res, next) {           
  try{
    const questions = await new myQuestion().fetchAll();
    res.json(questions.toJSON());
  }
  catch(error) {
    res.status(500).json({status: "error", error:error});
  }
});

router.post('/', async (req, res, next) => {
  try {
  let question = req.body;
  const add = await new myQuestion().save(question);
  res.json({ status: "added"});
  } catch (error) {
  res.status(500).json(error);
  }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
    let id = req.params.id;
    await new myQuestion({ id: id }).destroy();
    res.json({ status: "deleted" });
    } catch (error) {
    res.status(500).json(error);
    }
    });

  
router.put('/:id', async (req, res, next) => {
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
