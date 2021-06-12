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


const  lines = bookshelf.Model.extend({
    tableName: 'lines',
    idAttribute:'id'
})
const  stations = bookshelf.Model.extend({
    tableName: 'stations',
    idAttribute:'id'
})

router.get('/', async(req,res)=>{
    const ln = await new lines().fetchAll()
    const st = await new stations().fetchAll()
    res.json({ln:ln,st:st})
});

module.exports = router;