var userModel = require('../model/user/user.model');
var config = require('../../config');
var passport = require('passport');
configurePassport();

function userService(app) {

    app.post   ('/api/login', passport.authenticate('local'), login);
    app.post   ('/api/logout', logout);
    app.get    ('/api/authenticate', authenticate);

}
/**
 * User API routing
 */
module.exports = userService;

/**
 * User API route handlers
 */


function login(req, res) {
    res.json(req.user);
}

function logout(req, res) {
    req.logout();
    res.status(200).json({success: true});
}

function authenticate(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    }
    else {
        res.sendStatus(401);
    }
}

// HELPER METHODS

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function (user) {
                if (user)
                    return done(null, user);
                else
                    return done(null, false, { message: 'Incorrect password.' });
            },
            function (error) {
                return done(error, false);
            }
        );
}

function serializeUser(user, done) {
    done(null, user._id);
}

function deserializeUser(userId, done) {
    userModel
        .findById(userId)
        .then(
            function (user) {
                done(null, user);
            },
            function (error) {
                done(error, null);
            }
        );
}

function configurePassport() {
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
}
