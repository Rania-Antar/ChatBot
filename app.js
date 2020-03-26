var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
const formData = require('express-form-data')
var logger = require('morgan');
var expressSession = require('express-session')
var expressValidator = require('express-validator')
var cors = require('cors');

var usersRouter = require('./api/users')
var lostObjectRouter = require('./api/lostObjects')

app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(expressValidator())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: 'secret', saveUninitialized: false, resave: false}))
app.use(formData.parse())

app.use('/', usersRouter)
app.use('/lostOb', lostObjectRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
