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
    const novice = await new myNews().fetchAll();
    res.json(novice.toJSON());
  }
  catch (error) {
    res.status(500).json({ status: "error", error: error });
  }
});
/* Post new article. */
router.post('/', async (req, res, next) => {

  try {
    
    console.log(req.body);
    let article = {
      date:req.body.date,
      title:req.body.title,
      text:req.body.text,
      author:req.body.author.id,
      cover:req.body.cover
    }
    const newNews = await new myNews().save(article);
    res.json({ status: "added" });
  } catch (err) {
    res.status(500).json({ status: "error"});
  }
});

module.exports = router;
