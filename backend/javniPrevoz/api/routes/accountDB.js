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

const myAccounts = bookshelf.Model.extend({
    tableName:'users',
    idAttribute:'id'
});

router.get('/',async function(req, res, next) {  

    try {
        const accounts = await new myAccounts().fetchAll();
        res.json(accounts.toJSON());
    } catch (error) {
        res.status(500).json({status: "error", error:error});
    }

});

router.post('/login/',async function(req, res, next) {  

    let user = req.body;

    let mail = user.mail;
    let pass = user.pass;
    
    const accountz = await new myAccounts().fetchAll();

    console.log(user);

    const accounts = accountz.toJSON();

    //console.log(accounts);

    let checkUser = accounts.find(element => element.mail === mail);

    console.log(checkUser);

    if (checkUser != undefined){
    if ((checkUser.password == pass) && (checkUser != null)) {
      
        res.json({ status: "exists", user: checkUser});
        console.log('ok');
  
      }} else {
  
        res.json({ status: "noexists"});
        console.log('wrong');
  
      }

});

router.post('/register/',async function(req, res, next) {  

    try{
        let newUser = {
            name:req.body.name,
            surname:req.body.surname,
            username:req.body.username,
            mail:req.body.mail,
            birthdate:req.body.birthdate,
            pfp:req.body.pfp,
            password:req.body.password,
            city:req.body.city
        };
        let user = await new myAccounts().save(newUser);
        res.json(user.toJSON());
    }catch (error) {
        res.status(500).json({status: "error", error:error});
    }

});

router.put('/edit/',async function(req, res, next) {  



});

module.exports = router;