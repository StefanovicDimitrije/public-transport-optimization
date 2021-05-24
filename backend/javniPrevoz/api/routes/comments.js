const express = require('express');
const path = require('path');
var router = express.Router();
// in case you need to use a db for your node part you need to include the following:
const knexfile = require('../../knexfile').development;
const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);

const myComments = bookshelf.Model.extend({
    tableName:'comments',
    idAttribute:'id'
});

/* GET comments table. */

router.get('/',async function(req, res, next) {           
  try{
    const comments = await new myComments().fetchAll();
    res.json(comments.toJSON());
  }
  catch(error) {
    res.status(500).json({status: "error", error:error});
  }
});

router.post('/', async (req, res, next) => {
  try {
  let comments = req.body;
  const add = await new myComments().save(comments);
  res.json({ status: "added"});
  } catch (error) {
  res.status(500).json(error);
  }
  });


module.exports = router;
