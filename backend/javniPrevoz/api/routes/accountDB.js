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

router.get('/:id',async function(req, res, next) { 

    try {
    
        let id = req.params.id;

        const user = await new myAccounts().where('id',id).fetch();

        res.json({ status: "returned", user: user.toJSON() });
    }
    catch(error){
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
                    return Promise.resolve('mail');
                } else if (checkUser[i]["username"] === username)
                {
                    return Promise.resolve('username');
                }
            }
        
        if (checkMailUserExists == 'mail'){

            console.log("Existing email");
            res.json({ status: "existing email" });
            return;

        }
        else if (checkMailUserExists == 'username'){

            console.log("Existing username");
            res.json({ status: "existing username" });
            return;

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
        var editedUser = req.body.editedUser; 

        editedUser.birthdate = new Date (editedUser.birthdate + "T22:00:00.000Z");

        let id = editedUser.id; 

        let oldPassword = req.body.oldPassword;

        const oldUser0 = await new myAccounts().where('id',id).fetch();

        const oldUser = oldUser0.toJSON();

        if( (editedUser.mail != oldUser.mail) || (editedUser.username != oldUser.username) )
        {
            let existingUsers = await new myAccounts().fetchAll();   
            let checkUser = existingUsers.toJSON();

                for (let i=0; i < checkUser.length;i++)
                {
                    if ((checkUser[i]["mail"] === editedUser.mail) && (checkUser[i]["id"] != editedUser.id))
                    {
                        var checkMailUserExists = 'mail';
                    } else if ((checkUser[i]["username"] === editedUser.username)&& (checkUser[i]["id"] != editedUser.id))
                    {
                        var checkMailUserExists = 'username';
                    }
                }
        } else{
            var checkMailUserExists = 'ok';
        }
        
        if(!(bcrypt.compareSync(oldPassword,oldUser.password))){

            console.log("Wrong password");
            res.json({ status: "Wrong password", message: "Wrong password" });
            return;

        } else if (checkMailUserExists == 'mail'){

            console.log("Existing email");
            res.json({ status: "Existing email", message: "There is already an account made with that email" });
            return;

        }
        else if (checkMailUserExists == 'username'){

            console.log("Existing username");
            res.json({ status: "Existing username", message: "That username is already in use!" });
            return;

        }
        console.log(editedUser.password);
        if (editedUser.password == ''){
            editedUser.password = oldUser.password;
        }else{
            editedUser.password = bcrypt.hashSync(editedUser.password,12);
        }

        console.log(editedUser.password);

        await oldUser0.save(editedUser);   //Jer je oldUser0 knex objekat, oldUser se koristi samo sto se tice informacija

        res.json({ status: "edited", user: editedUser });
    
    }catch (error) {
        res.status(500).json({status: "error", error:error});
    }

});

router.post('/oneUser/',async function(req, res, next) { 

    try {
    
        let id = req.body.id;

        const user = await new myAccounts().where('id',id).fetch();

        res.json({ status: "returned", user: user.toJSON() });
    }
    catch(error){
        res.status(500).json({status: "error", error:error});
    }

});

/*async function checkMailUserExists(email,username){

    let existingUsers = await new myAccounts().fetchAll();
    let checkUser = existingUsers.toJSON();
        
        for (let i=0; i < checkUser.length;i++)
        {
            if (checkUser[i]["mail"] === email)
            {
                return Promise.resolve('mail');
            } else if (checkUser[i]["username"] === username)
            {
                return Promise.resolve('username');
            }
        }

}*/

module.exports = router;