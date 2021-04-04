var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require("body-parser");
import userApi from './api/user'

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 静态资源
// app.use('/static', express.static(path.join(__dirname, '/public')));
app.use('/static',express.static(path.join(__dirname, 'public')));

// 解析 application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// 解析 application/json
var jsonParser = bodyParser.json();

app.use(urlencodedParser)
app.use(jsonParser)

app.use(userApi)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
