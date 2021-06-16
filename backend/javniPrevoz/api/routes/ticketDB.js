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
    tableName: 'users',
    idAttribute: 'id'
});

const myTickets = bookshelf.Model.extend({
    tableName: 'tickets',
    idAttribute: 'id'
});

router.get('/', async function (req, res, next) {

    try {
        const ticketz = await new myTickets().fetchAll();
        const tickets = ticketz.toJSON();
        
        for(var i = 0; i < tickets.length; i++){
            tickets[i].ticket = Buffer.from(tickets[i].ticket,'base64').toString('base64');
        }

        res.json(tickets);
    } catch (error) {
        res.status(500).json({ status: "error", error: error });
    }

});

router.post('/userPost', async function (req, res, next) {

    try {
        console.log('start');
        let ticket = Buffer.from(req.files.ticket.data);
        let tk_id_users = req.body.tk_id_users;

        let newTicket = {
            id:null,
            tk_id_users:tk_id_users,
            ticket: ticket
        };
        console.log(newTicket);

        const tickets = await new myTickets().save(newTicket);
        console.log('here');
        
        res.json({ status: "uploaded" });

    } catch (error) {
        res.status(500).json({ status: "error", error: error });
    }

});

module.exports = router;