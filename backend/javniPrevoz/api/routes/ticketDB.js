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
        
        let ticket = Buffer.from(req.files.ticket.data);
        let tk_id_users = req.body.tk_id_users;

        let newTicket = {
            id:null,
            tk_id_users:tk_id_users,
            ticket: ticket
        };
        console.log(newTicket);

        const tickets = await new myTickets().save(newTicket);
        
        res.json({ status: "uploaded" });

    } catch (error) {
        res.status(500).json({ status: "error", error: error });
    }

});

router.delete('/approve', async function (req , res, next){

    try {
        
        let ticketId = req.body.ticketId;
        let userId = req.body.userId;

        await new myTickets({id:ticketId}).destroy(); // Delete the ticket from the database

        let user0 = await new myAccounts().where('id',userId).fetch(); // Get the user that submitted the ticket

        let user1 = user0.toJSON(); // Convert it into JSON so we can change the attribute

        console.log(user1);

        user1.confirmTicket = 1; // Change the info, the ticket is now confirmed

        console.log(user1);

        await user0.save(user1); // Save it into the database

        res.json({ status: "approved" });

    } catch (error) {
        res.status(500).json({ status: "error", error: error });
    }

})

module.exports = router;