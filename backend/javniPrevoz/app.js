const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
var bodyParser = require('body-parser');

const indexRouter = require('./api/routes/index');
const newsRouter = require('./api/routes/newsDB'); //News
const commentsRouter = require('./api/routes/comments'); //Comments
const changesRouter = require('./api/routes/changesDB'); //Changes
const questionsRouter = require('./api/routes/questionsDB'); //Questions
const lineRouter = require('./api/routes/lines');
const linesPostRouter = require('./api/routes/Linija_ruta');
const stationRouter = require('./api/routes/stations');
const accountRouter = require('./api/routes/accountDB'); //Account data (login, register, display, edit)
const reviewRouter = require('./api/routes/driverReview')
const questionsReplyRouter = require('./api/routes/questionReply')
const app = express();

//:)
//midware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../frontend'))); //needed for pictures and other directories to work together properly
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set('json spaces', 2);
app.use(express.urlencoded({ extended: false }));
app.use(require("body-parser").json())

app.use(express.urlencoded({ extended: false })); //KARAKATIC SAID WE HAVE TO ADD THIS DICTIONARY

app.use(express.json({
    type: ['application/json', 'text/plain']
}))

app.use('/', indexRouter);
app.use('/news', newsRouter); //News
app.use('/comments', commentsRouter); //Comments
app.use('/changes', changesRouter); //Changes
app.use('/questions', questionsRouter); //questions
app.use('/lines', lineRouter);
app.use('/stations', stationRouter);
app.use('/linije', linesPostRouter);
app.use('/account', accountRouter); //Accounts
app.use('/review', reviewRouter);
app.use('/questionsReply', questionsReplyRouter);

module.exports = app;