const express = require('express');
const path = require('path');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {               // load index page on http://localhost:3000/
  res.sendFile(path.resolve("../../frontend","pages","index.html"));
});

module.exports = router;
