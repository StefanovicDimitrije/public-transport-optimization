const express = require('express');
const path = require('path');
var router = express.Router();
// in case you need to use a db for your node part you need to include the following:
const knexfile = require('../../knexfile').development;
const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);

const myNovica = bookshelf.Model.extend({
    tableName:'News',
    idAttribute:'id'
});

/* GET Novic table. */

router.get('/',async function(req, res, next) {           
  try{
    const novice = await new myNovica().fetchAll();
    res.json(novice.toJSON());
  }
  catch(error) {
    res.status(500).json({status: "error", error:error});
  }
});

module.exports = router;
