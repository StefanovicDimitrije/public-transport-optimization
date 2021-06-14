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
const bus = bookshelf.Model.extend({
    tableName: 'buses',
    idAttribute: 'id'
})
const driverBusB1 = bookshelf.Model.extend({
    tableName: 'drivers_buses',
    idAttribute: 'id'
})
const drivers = bookshelf.Model.extend({
    tableName: 'drivers',
    idAttribute: 'id'
})
const line = bookshelf.Model.extend({
    tableName: 'lines',
    idAttribute: 'id'
})
router.get('/', async(req,res)=>{
    const ls = await new line_station().fetchAll()
    res.json(ls.toJSON())
});


router.get('/lineAndStation', async(req,res)=>{
    const lines = await new line().fetchAll()
    const stations = await new station().fetchAll()
    let ls = JSON.stringify(lines)
    let sn = JSON.stringify(stations)
    return  res.json({lines:lines,station:stations})
});



router.post('/',async(req,res)=>{

    let line = req.body;
    console.log(line)
    const allLines = await new lines().fetchAll();
    const liness = await new lines().where('id',line.tk_id_line).fetchAll(); // dodati listu svih linija 
    const ls = await new line_station().where('tk_id_line',line.tk_id_line)/*.andWhere('day',line.day).andWhere('tk_id_bus_driver',line.tk_id_bus_driver).andWhere('order',line.order).andWhere('tk_id_stations',line.tk_id_line)*/.fetchAll()
    const buss = await new bus().fetchAll();
    const st = await new station().fetchAll();
    const busDriver = await new driverBusB1().where('id',line.tk_id_bus_driver).fetchAll();
    const busDriverAll = await new driverBusB1().fetchAll();
    const driverName = await new drivers().fetchAll();
    return res.json({status:"dodna",lines:liness,driver:driverName,lineStation:ls,bus:buss,station:st,busDriver:busDriver,allLines:allLines,busDriverAll:busDriverAll})

})
router.put('/',async(req,res)=>{
    let edit = req.body;
    console.log(edit)
    const editLineStation = await new line_station().where('id',edit.id).fetch()

    try{
        await editLineStation.save(edit);
        return res.json({status:"ok"})
    }catch (error) {
        return res.status(500).json({ status: "error", error: error });
    }
    
   
})

router.put('/station/:id',async(req,res)=>{
    let edit = req.body;
    console.log(edit)
    const editStation = await new station().where('id',edit.id).fetch()

    try{
        await editStation.save(edit);
        return res.json({status:"ok"})
    }catch (error) {
        res.status(500).json({ status: "error", error: error });
    }
    
   
})
router.put('/line/:id',async(req,res)=>{
    let edit = req.body;
    console.log(edit)
    const editLine = await new line().where('id',edit.id).fetch()

    try{
        await editLine.save(edit);
        return res.json({status:"ok"})
    }catch (error) {
        res.status(500).json({ status: "error", error: error });
    }
    
   
})

module.exports = router;