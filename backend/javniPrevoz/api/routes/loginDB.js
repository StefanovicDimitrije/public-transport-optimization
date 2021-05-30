const express = require('express');
const path = require('path');
var router = express.Router();
let loginCurrent = require('../../data/loginCurrent');

router.get('/',async function(req, res, next) {  
    res.json(loginCurrent[0]);
    console.log(loginCurrent[0]);
});

router.post('/',async function(req, res, next) {  //When the user is logging in

    let user = req.body;

    loginCurrent.push(user);

    console.log(loginCurrent);

});

router.delete('/',async function(req, res, next) {  //When the user is logging out

    loginCurrent.pop();

});

module.exports = router;