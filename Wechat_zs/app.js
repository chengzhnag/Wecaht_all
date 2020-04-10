var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
const db = require('./mongodb/db.js').db;
const config = require('config-lite')(__dirname);
const session = require('express-session');
const connectMongo = require('connect-mongo');
const history = require('connect-history-api-fallback');
const chalk = require('chalk');
const bodyParser = require('body-parser');

// 全局config
global._config = config;

// require路由
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

process.env.PORT = config.port;


// 自定义跨域中间件
var allowCors = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
};
app.use(allowCors); //使用跨域中间件


// view engine setup ejs模板解析
app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname, 'views')); //注意path要require一下
app.set('view engine', 'html'); // app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mongodb数据库连接
const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
	name: config.session.name,
	secret: config.session.secret,
	resave: true,
	saveUninitialized: false,
	cookie: config.session.cookie,
	store: new MongoStore({
		url: config.url
	})
}))


app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use(history());

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