
// Dependencies
var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);

// Express
var app = express();

app.set('port', process.env.PORT || 3000);

// Views
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'jade');

app.use(cookieParser());

// MongoDB
app.use(session({
	secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ host: 'localhost', port: 27017, db: 'node-login'})
	})
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Stylus
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));

// Routes
require('./app/server/routes')(app);

if (app.get('env') == 'development') app.use(errorHandler());

// Start Server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
