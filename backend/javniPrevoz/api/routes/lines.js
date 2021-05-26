var express = require('express');

var router = express.Router();
const knexfile = require('../../knexfile').development;
const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);


const  lines = bookshelf.Model.extend({
    tableName: 'Lines',
    idAttribute:'id'
})

router.get('/', async(req,res)=>{
    const ln = await new lines().fetchAll()
    res.json(ln.toJSON())
});

module.exports = router;