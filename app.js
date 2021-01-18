const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const mediaRouter = require('./routes/media');
const reviewRouter = require('./routes/review');
const wantToWatchRouter = require('./routes/wantToWatch');
const watchedRouter = require('./routes/watched');
const jwt_auth = require('express-jwt');
const env = require('dotenv').config();
const cors = require('cors');
const checkAuth = require('./middlewares/checkAuth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({credentials: true, origin: process.env.HTTPS_ORIGIN}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwt_auth({
	secret: process.env.TOKEN_SECRET_ACCESS,
	algorithms: ['HS256'],
	audience: 'http://teamkill.at/api',
	credentialsRequired: true,
	getToken: req => req.cookies.access_token

}).unless({
	path: [
		{url: /^\/users/, methods: ['POST']},
		{url: /^\/auth\/login/, methods: ['POST']}
	]
}));
app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		console.log(err.name)
		checkAuth(req, res, next)
	}
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/media', mediaRouter);
app.use('/review', reviewRouter);
app.use('/wantToWatch', wantToWatchRouter)
app.use('/watched', watchedRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
