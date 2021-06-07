const express = require('express');
const path = require('path');
var router = express.Router();

const bcrypt = require('bcryptjs');   //for hashing passwords

//const fileUpload=require('express-fileupload');
//app.use(fileUpload);
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

    try {

        let mail = req.body.mail;
        let pass = req.body.pass;
        
        let checkUser0 = await new myAccounts().where('mail',mail).fetch();
        let checkUser = checkUser0.toJSON();

        let checkPass = bcrypt.compareSync(pass, checkUser.password);

        if(checkPass){

            res.json({ status: "exists", user: checkUser});

        } 
        else{
            res.json({ status: "noexists"});
        }

    } 
    catch (error){
        res.status(500).json({status: "error", error:error});
    }

});

router.post('/register',async function(req, res, next) {  

    try{
        //let profilePicture = Buffer.from(req.files.pfp.data);
        let email = req.body.mail;
        let profileUsername = req.body.username;
        let existingUsers = await new myAccounts().fetchAll();
        let checkUser = existingUsers.toJSON();
        
        for (let i=0; i < checkUser.length;i++)
        {
            if (checkUser[i]["mail"] === email)
            {
                console.log("Existing email");
                res.json({ status: "existing email" });
                return;
            } else if (checkUser[i]["username"] === profileUsername)
            {
                console.log("Existing username");
                res.json({ status: "existing username" });
                return;
            }
        }
        let newUser = {
            name:req.body.name,
            surname:req.body.surname,
            username:profileUsername,
            mail:email,
            birthdate:req.body.birthdate,
            pfp:req.body.pfp, //profilePicture
            password:req.body.password,
            city:req.body.city
        };
        newUser.password = bcrypt.hashSync(newUser.password,12);
        let user = await new myAccounts().save(newUser);
        res.json({ status: "added" });
    }catch (error) {
        res.status(500).json({status: "error", error:error});
    }

});

router.put('/editProfile/',async function(req, res, next) {  

    try{
        let editedUser = {
            name:req.body.name,
            surname:req.body.surname,
            username:req.body.username,

            birthdate:req.body.birthdate,
            pfp:req.body.pfp, //profilePicture

            city:req.body.city
        };
        


        res.json({ status: "edited", user: editedUser });
    }catch (error) {
        res.status(500).json({status: "error", error:error});
    }

});

module.exports = router;