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

const myFavourites = bookshelf.Model.extend({
  tableName: 'favourites',
  idAttribute: 'id'
});
/* GET News table. */

router.get('/', async function (req, res, next) {
  try {
    const allfavourites = await new myFavourites().fetchAll();
    res.json(allfavourites.toJSON());
  }
  catch (error) {
    res.status(500).json({ status: "error", error: error });
  }
});
/* GET all favourites from one user */
router.get('/:id', async (req, res) => {

  try {
    let id = req.params.id;
    let favourites = await new myFavourites().where('tk_id_users', id).fetchAll();
    res.json(favourites.toJSON());
  } catch (erorr) {
    res.status(500).json({ status: "error", error: error });
  }
});
/*GET specific line favourite from one user*/
router.get('/:user/:id', async (req, res) => {

  try {
    let user = req.params.user;
    let id = req.params.id;

    let favourites = await new myFavourites().where('tk_id_users', user).where('tk_id_lines',id).fetch();
    let favouritesJson = favourites.toJSON(); 

    console.log(favouritesJson);
    
    if (favouritesJson)
    {
      res.json({status:"fetched", favourites:favouritesJson});
    }
    else {
      console.log('evo me');
      res.json({status:"not found"});
    }
  } catch (erorr) {
    res.status(500).json({ status: "error", error: error });
  }
});
/* Post new favourite. */
router.post('/', async (req, res, next) => {

  try {
    let favourite = req.body;
    const newFavourite = await new myFavourites().save(favourite);
    res.json({ status: "added" });
  } catch (erorr) {
    res.status(500).json({ status: "error", error: error });
  }
});

router.delete('/:id/:user', async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = req.params.user;
    await new myFavourites().where('tk_id_users', user).where('tk_id_lines',id).destroy();
    res.json({ status: "deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
