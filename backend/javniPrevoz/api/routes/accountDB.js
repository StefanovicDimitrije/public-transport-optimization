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
        userJson.pfp = Buffer.from(userJson.pfp,'base64').toString('base64');

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

    try {
        let profilePicture = Buffer.from(req.files.pfp.data);
        //let pic = Buffer.from(req.body.pfp);
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
                console.log("Existing email");
                res.json({ status: "Existing email" });
                return;
            } else if (checkUser[i]["username"] === profileUsername) {
                console.log("Existing username");
                res.json({ status: "Existing username" });
                return;
            }
        }
        console.log(req.body);
        let newUser = {
            name: req.body.name,
            surname: req.body.surname,
            username: profileUsername,
            mail: email,
            birthdate: myDate,
            pfp: profilePicture, //pic, //req.body.pfp,
            password: req.body.password,
            city: req.body.city,
            admin: req.body.admin
        };
        newUser.password = bcrypt.hashSync(newUser.password, 12);
        let user = await new myAccounts().save(newUser);
        res.json({ status: "added" });
        //res.redirect(200,"C:\Users\Asus\Desktop\Project\optimizacija-javnega-prevoza\frontend\pages\login.html");
    } catch (error) {
        res.status(500).json({ status: "error", error: error });
    }

});

router.put('/editProfile/', async function (req, res, next) {

    try {
        var editedUser = req.body.editedUser;

        editedUser.birthdate = new Date(editedUser.birthdate + "T22:00:00.000Z");

        let id = editedUser.id;

        let oldPassword = req.body.oldPassword;

        const oldUser0 = await new myAccounts().where('id', id).fetch();

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

            console.log("Wrong password");
            res.json({ status: "Wrong password", message: "Wrong password" });
            return;

        } else if (checkMailUserExists == 'mail') {

            console.log("Existing email");
            res.json({ status: "Existing email", message: "There is already an account made with that email" });
            return;

        } else if (checkMailUserExists == 'username') {

            console.log("Existing username");
            res.json({ status: "Existing username", message: "That username is already in use!" });
            return;

        }
        console.log(editedUser.password);
        if (editedUser.password == '') {
            editedUser.password = oldUser.password;
        } else {
            editedUser.password = bcrypt.hashSync(editedUser.password, 12);
        }

        console.log(editedUser.password);

        await oldUser0.save(editedUser); //Jer je oldUser0 knex objekat, oldUser se koristi samo sto se tice informacija

        res.json({ status: "edited", user: editedUser });

    } catch (error) {
        res.status(500).json({ status: "error", error: error });
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