const express = require('express');
const path = require('path');
var router = express.Router();


const knexfile = require('../../knexfile').development;
const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);

const myAccounts = bookshelf.Model.extend({
    tableName:'accountTable',
    idAttribute:'id'
});

router.get('/',async function(req, res, next) {  

    try {
        const accounts = await new accounts().fetchAll();
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


    let checkUser = accounts.find(element => element.mail === mail);

    //console.log(checkUser);

    if ((checkUser.password == pass) && (checkUser != null)) {
      
        res.json({ status: "exists", user: checkUser});
        console.log('ok');
  
      } else {
  
        res.json({ status: "noexists", user: checkUser.id});
        console.log('wrong');
  
      }

});

router.post('/register/',async function(req, res, next) {  



});

router.put('/edit/',async function(req, res, next) {  



});

module.exports = router;