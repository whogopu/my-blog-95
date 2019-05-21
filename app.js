var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require("cors");
var configHolder = require('./config/config');
var helperFunction = require('./helpers/helper.function')
var indexRouter = require('./routes/index.route');
var usersRouter = require('./routes/users.route');
var postsRouter = require('./routes/posts.route');
var expressValidation = require('express-validation');
var UnauthorizedError = require('express-jwt').UnauthorizedError;
var JsonWebTokenError = require('jsonwebtoken').JsonWebTokenError;
var APIError = require('./helpers/API-error');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

// Mongoose Middleware
mongoose.connect(
	configHolder.mongodb.url,
	{
		useNewUrlParser: true
	}
);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("MongoDB Connected..."));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
app.get('*', (req, res, next) => res.sendFile(path.join(__dirname, 'client/build/index.html')));

app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status);
    return next(error);
  } else if (err instanceof UnauthorizedError) {
    const apiError = new APIError(err.message, 401);
    return next(apiError);
  } else if(err instanceof JsonWebTokenError) {
    const apiError = new APIError(err.message, 401);
    return next(apiError);
  }
  return next(err);
});

// error handler
app.use((err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json(helperFunction.responseHandler(false, { message: err.message }));
  } else {
    console.log(err);
    return res.status(500).json(helperFunction.responseHandler(false, { message: 'Something went wrong' }));
  }
});


module.exports = app;
