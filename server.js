var express = require('express'),
    app     = express(),
    path    = require('path'),
    morgan  = require('morgan'),
    cookies = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport')
    config  = require('./config'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookies());
app.use(session({secret: config.sessionPassword, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

require('./app/app')(app);

mongoose.connect(config.connectionString, {useMongoClient: true});

// MAIN CATCHALL ROUTE
// =========================================

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(config.port);
console.log('Magic happens on port ' + config.port);
