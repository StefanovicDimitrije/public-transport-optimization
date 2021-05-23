const express = require('express');
const path = require('path');
var router = express.Router();

const knexfile = require('../../knexfile').development;
const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);

const myChanges = bookshelf.Model.extend({
    tableName:'changesTable',
    idAttribute:'id'
});

router.get('/',async function(req, res, next) {                
  try{
    const changes = await new myChanges().fetchAll();
    res.json(changes.toJSON());
  }
  catch(error) {
    res.status(500).json({status: "error", error:error});
  }
});

module.exports = router;