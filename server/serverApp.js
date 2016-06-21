var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

//server connection
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/musical-forecast';

//passport connection
var passport = require('./strategies/user_sql.js');
var session = require('express-session');

//Route inclusion
var login = require('./routes/login');
var register = require('./routes/register');
var router = require('./routes/routes');
var musicBrainz = require('./routes/musicBrainz');
var follow = require('./routes/follow');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/musicBrainz/', musicBrainz);
app.use('/follow', follow);
app.use('/register', register);
app.use('/router', router);
app.use('/login', login);
app.use('/', login);


//set port and listen
app.set('port', process.env.PORT || 9000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
