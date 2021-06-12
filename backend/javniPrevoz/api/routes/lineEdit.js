const { json } = require('body-parser');
const e = require('express');
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
    console.log(line)
    const liness = await new lines().where('id',line.tk_id_line).fetchAll(); // dodati listu svih linija 
    const ls = await new line_station().where('tk_id_line',line.tk_id_line)/*.andWhere('day',line.day).andWhere('tk_id_bus_driver',line.tk_id_bus_driver).andWhere('order',line.order).andWhere('tk_id_stations',line.tk_id_line)*/.fetchAll()
    const driver = await new driverB1().fetchAll();
    const st = await new station().fetchAll();
    const busDriver = await new driverBusB1().where('id',line.tk_id_bus_driver).fetchAll();

    return res.json({status:"dodna",lines:liness,lineStation:ls,driver:driver,station:st,busDriver:busDriver})

})
router.put('/',async(req,res)=>{
    let edit = req.body;
    console.log(edit)
    const editLineStation = await new line_station().where('id',edit.id).fetch()

    try{
        await editLineStation.save(edit);
        return res.json({status:"ok"})
    }catch (error) {
        res.status(500).json({ status: "error", error: error });
    }
    
   
})

module.exports = router;