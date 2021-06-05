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

const myNews = bookshelf.Model.extend({
  tableName: 'news',
  idAttribute: 'id'
});
/* GET News table. */

router.get('/', async function (req, res, next) {
  try {
    console.log("Evo me 1!");
    const novice = await new myNews().fetchAll();
    console.log("Evo me!");
    res.json(novice.toJSON());
  }
  catch (error) {
    res.status(500).json({ status: "error", error: error });
  }
});
/* Post new article. */
router.post('/', async (req, res, next) => {

  try {
    let article = req.body;
    const newNews = await new myNews().save(article);
    res.json({ status: "added" });
  } catch (erorr) {
    res.status(500).json({ status: "error", error: error });
  }
});

module.exports = router;
