const express = require('express');
const path = require('path');
var router = express.Router();
// in case you need to use a db for your node part you need to include the following:
const knexfile = require('../../knexfile').development;
const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);

const myNews = bookshelf.Model.extend({
  tableName: 'News',
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
    let article = req.body;
    const newNews = await new myNews().save(article);
    res.json({ status: "added" });
  } catch (erorr) {
    res.status(500).json({ status: "error", error: error });
  }
});

module.exports = router;
