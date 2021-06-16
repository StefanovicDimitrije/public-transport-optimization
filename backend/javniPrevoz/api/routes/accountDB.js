const express = require('express');
const path = require('path');
var router = express.Router();

const bcrypt = require('bcryptjs'); //for hashing passwords

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
    tableName: 'users',
    idAttribute: 'id'
});

router.get('/', async function (req, res, next) {

    try {
        const accounts = await new myAccounts().fetchAll();
        res.json(accounts.toJSON());
    } catch (error) {
        res.status(500).json({ status: "error", error: error });
    }

});

router.get('/:id', async function (req, res, next) {

    try {

        let id = req.params.id;

        const user = await new myAccounts().where('id', id).fetch();
        const userJson = user.toJSON();
        userJson.pfp = Buffer.from(userJson.pfp, 'base64').toString('base64');

        res.json({ status: "returned", user: userJson });
    } catch (error) {
        res.status(500).json({ status: "error", error: error });
    }

});

router.post('/login/', async function (req, res, next) {

    try {

        let mail = req.body.mail;
        let pass = req.body.pass;

        let checkUser0 = await new myAccounts().where('mail', mail).fetch();
        let checkUser = checkUser0.toJSON();

        let checkPass = bcrypt.compareSync(pass, checkUser.password);

        if (checkPass) {

            res.json({ status: "exists", user: checkUser });

        } else {
            res.json({ status: "noexists" });
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error });
    }

});

router.post('/register', async function (req, res, next) {


    let profilePicture = Buffer.from(req.files.pfp.data);
    let email = req.body.mail;
    let profileUsername = req.body.username;
    let date = req.body.birthdate;
    let month = date.substring(0, 2);
    let day = date.substring(3, 5);
    let year = date.substring(6, 10); //10/28/2002
    let myDate = year + "-" + month + "-" + day;

    let existingUsers = await new myAccounts().fetchAll();
    let checkUser = existingUsers.toJSON();

    for (let i = 0; i < checkUser.length; i++) {
        if (checkUser[i]["mail"] === email) {
            res.json({ status: "Existing email" });
            return;
        } else if (checkUser[i]["username"] === profileUsername) {
            res.json({ status: "Existing username" });
            return;
        }
    }
    let newUser = {
        name: req.body.name,
        surname: req.body.surname,
        username: profileUsername,
        mail: email,
        birthdate: myDate,
        pfp: profilePicture,
        password: req.body.password,
        city: req.body.city,
        admin: req.body.admin,
        confirmTicket: req.body.confirmTicket
    };
    newUser.password = bcrypt.hashSync(newUser.password, 12);
    let user = await new myAccounts().save(newUser);
    res.json({ status: "added" });
    //res.redirect(200,"C:\Users\Asus\Desktop\Project\optimizacija-javnega-prevoza\frontend\pages\login.html");


});

router.put('/editProfile/', async function (req, res, next) {

    try {

        let profilePicture = Buffer.from(req.files.pfp.data); //Get the picture buffered

        let id = req.body.id; //Get the id to find the place to update

        let oldPassword = req.body.oldPassword; //Get the password entered for verification

        let editedUser = {
            id: id,
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username,
            mail: req.body.mail,
            birthdate: new Date(req.body.birthdate + "T22:00:00.000Z"),
            pfp: profilePicture,
            password: req.body.newPassword,
            city: req.body.city,
            admin: req.body.admin
        };

        //Find the user needed to update
        const oldUser0 = await new myAccounts().where('id', id).fetch();
        //Make a json version to check if ok
        const oldUser = oldUser0.toJSON();

        if ((editedUser.mail != oldUser.mail) || (editedUser.username != oldUser.username)) {
            let existingUsers = await new myAccounts().fetchAll();
            let checkUser = existingUsers.toJSON();

            for (let i = 0; i < checkUser.length; i++) {
                if ((checkUser[i]["mail"] === editedUser.mail) && (checkUser[i]["id"] != editedUser.id)) {
                    var checkMailUserExists = 'mail';
                } else if ((checkUser[i]["username"] === editedUser.username) && (checkUser[i]["id"] != editedUser.id)) {
                    var checkMailUserExists = 'username';
                }
            }
        } else {
            var checkMailUserExists = 'ok';
        }

        if (!(bcrypt.compareSync(oldPassword, oldUser.password))) {

            //console.log("Wrong password");
            res.json({ status: "Wrong password", message: "Wrong password" });
            return;

        } else if (checkMailUserExists == 'mail') {

            //console.log("Existing email");
            res.json({ status: "Existing email", message: "There is already an account made with that email" });
            return;

        } else if (checkMailUserExists == 'username') {

            //console.log("Existing username");
            res.json({ status: "Existing username", message: "That username is already in use!" });
            return;

        }

        editedUser.confirmTicket = oldUser.confirmTicket;

        //console.log(editedUser.password);
        
        if (editedUser.password == '') {
            editedUser.password = oldUser.password;
        } else {
            editedUser.password = bcrypt.hashSync(editedUser.password, 12);
        }

        //console.log(editedUser.password);

        await oldUser0.save(editedUser); //Jer je oldUser0 knex objekat, oldUser se koristi samo sto se tice informacija

        res.json({ status: "edited", user: editedUser });

    } catch (error) {
        res.status(500).json({ status: "error", error: error });
    }

});


module.exports = router;