var express = require('express');
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


const  station = bookshelf.Model.extend({
    tableName: 'stations',
    idAttribute:'id'
})

router.get('/', async(req,res)=>{
    const st = await new station().fetchAll()
    res.json(st.toJSON())
});

module.exports = router;