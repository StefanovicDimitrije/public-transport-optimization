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
    let tk_id_user = req.body.tk_id_user;
    const add = await new driversReview().save({tk_id_driver:dr,mark:oc,comment:com,tk_id_user:tk_id_user});
    const all = await new driversReview().fetchAll()
    //console.log(JSON.stringify(all.toJSON()))
    res.json({status:"added"});



})
module.exports = router;
