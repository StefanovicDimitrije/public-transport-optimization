var express = require('express');

var router = express.Router();
const knexfile = require('../../knexfile').development;
const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);


const  station = bookshelf.Model.extend({
    tableName: 'Stations',
    idAttribute:'id'
})

router.get('/', async(req,res)=>{
    const st = await new station().fetchAll()
    res.json(st.toJSON())
});

module.exports = router;