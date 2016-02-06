var express = require('express'); 
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');
var router = express.Router();

require('dotenv').load();

// Connect to the database
//mongoose.connect(configDB.url);
require('./config/passport')(passport); //Pass passport for configuration

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'jade');
app.set('views', process.cwd() + '/templates');
app.use(express.static(process.cwd() + '/public'));


app.use(session({ secret: 'supersecretsession' }));
app.use(passport.initialize()); 
app.use(passport.session());
app.use(flash());

// routes
require('./routes/index.js')(app, passport);


app.listen(port, function(){
    console.log('Nodejs listening on port ' + port); 
});