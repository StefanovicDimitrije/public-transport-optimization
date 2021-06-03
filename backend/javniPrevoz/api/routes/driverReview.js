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

const drivers = bookshelf.Model.extend({
    tableName:'drivers',
    idAttribute: 'id'
})

const driversReview = bookshelf.Model.extend({
    tableName:'driverReview',
    idAttribute: 'id'
})

router.get('/',async(req,res)=>{
    const review = await new driversReview().fetchAll();
    const driver = await new drivers().fetchAll();
    review.toJSON;
    driver.toJSON;
    res.json({status:"vrati",review:review,driver:driver});
})
router.post('/',async(req,res)=>{
    //console.log(req.body);
    let dr = req.body.driver;
    let oc = req.body.mark;
    let com = req.body.comment;
    let ad = req.body;
    const add = await new driversReview().save({tk_id_driver:dr,mark:oc,comment:com});
    add.toJSON;
    console.log(add);
 
    res.json({status:"added",add:add});



})
module.exports = router;
