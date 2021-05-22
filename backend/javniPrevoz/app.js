const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./api/routes/index');
const testRouter = require('./api/routes/testDB'); // testing DB

const app = express();

//:)
//midware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../frontend'))); //needed for pictures and other directories to work together properly

app.use('/', indexRouter);
app.use('/test', testRouter); //testing DB

module.exports = app;
