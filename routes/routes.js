var User = require('./user.js');
var passport = require('passport')

require('../init/passport')(passport)

module.exports = function (app, passport, request, nodeWidget, fs) {

    app.get('/', function (req, res) {
        res.redirect('/login');
    });

    app.get('/login', function (req, res) {
        res.sendFile('/app/public/login.html', {
            message: req.flash('loginMessage')
        });
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/home',
        failureRedirect: '/'
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/register', function (req, res) {
        res.sendFile('/app/public/login.html');
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/register',
        failureFlash: true
    }));

    app.get('/home', isLoggedIn, function (req, res, next) {
        res.sendFile('/app/public/index.html');
    });

    app.get('/about', isLoggedIn, function (req, res, next) {
        res.sendFile('/app/about.json');
    });

    app.get('/:username/:password', function (req, res) {
        var newUser = new User();
        newUser.local.username = req.params.username;
        newUser.local.password = req.params.password;
        console.log(newUser.local.username + " " + newUser.local.password);
        newUser.save(function (err) {
            if (err)
                throw err;
        });
        res.send("Success!");
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}