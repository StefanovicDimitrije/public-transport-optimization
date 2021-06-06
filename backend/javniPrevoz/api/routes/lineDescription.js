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

const  line_station = bookshelf.Model.extend({
    tableName: 'lines_stations',
    idAttribute:'id'
})
const  lines = bookshelf.Model.extend({
    tableName: 'lines',
    idAttribute:'id'
})
const  station = bookshelf.Model.extend({
    tableName: 'stations',
    idAttribute:'id'
})
const driverB1 = bookshelf.Model.extend({
    tableName: 'drivers',
    idAttribute: 'id'
})
const driverBusB1 = bookshelf.Model.extend({
    tableName: 'drivers_buses',
    idAttribute: 'id'
})
router.get('/', async(req,res)=>{
    const ls = await new line_station().fetchAll()
    res.json(ls.toJSON())
});

router.post('/',async(req,res)=>{
    let line = req.body;
    const liness = await new lines().where('id',line.id).fetchAll(); // dodati listu svih linija 
    const ls = await new line_station().where('tk_id_line',line.id).fetchAll()
    const driver = await new driverB1().fetchAll();
    const st = await new station().fetchAll();
    const busDriver = await new driverBusB1().fetchAll();

    return res.json({status:"dodna",lines:liness,lineStation:ls,driver:driver,station:st,busDriver:busDriver})

})

module.exports = router;