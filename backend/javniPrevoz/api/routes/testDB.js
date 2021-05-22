const express = require('express');
const path = require('path');
var router = express.Router();
// in case you need to use a db for your node part you need to include the following:
const knexfile = require('../../knexfile').development;
const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);

const myTest = bookshelf.Model.extend({
    tableName:'testTable',
    idAttribute:'id'
});

/* GET test table. */

router.get('/',async function(req, res, next) {           
  try{
    const tests = await new myTest().fetchAll();
    res.json(tests.toJSON());
  }
  catch(error) {
    res.status(500).json({status: "error", error:error});
  }
});

module.exports = router;
