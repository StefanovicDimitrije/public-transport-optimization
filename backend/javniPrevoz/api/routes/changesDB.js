const express = require('express');
const path = require('path');
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

const line_station = bookshelf.Model.extend({
    tableName:'line_station',
    idAttribute:'id'
});

const myChanges = bookshelf.Model.extend({
  tableName:'changes',
  idAttribute:'id'
});

router.get('/',async function(req, res, next) {                
  try{
    const changes = await new myChanges().fetchAll();
    res.json(changes.toJSON());
  }
  catch(error) {
    res.status(500).json({status: "error", error:error});
  }
});

router.post('/lineStation',async function(req, res, next) {                
  let edit = req.body;
  const changes = await new myChanges().fetchAll();
  try{
    
      await new myChanges().save(edit);
  
      return res.json({status:"ok"})
  }catch (error) {
      res.status(500).json({ status: "error", error: error });
  }
  
});
router.post('/line',async function(req, res, next) {                
  let edit = req.body;
 
  const changes = await new myChanges().fetchAll();

    try{
      await new myChanges().save(edit)
     
        return res.json({status:"ok"})
    }catch (error) {
        res.status(500).json({ status: "error", error: error });
    }
    
});
router.post('/station',async function(req, res, next) {                
  let edit = req.body;


  try{
    await new myChanges().save(edit)
      return res.json({status:"ok"})
  }catch (error) {
      res.status(500).json({ status: "error", error: error });
  }
  
});

module.exports = router;