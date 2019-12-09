var localStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./facebook_init.js');
var User = require('../routes/user.js');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use('local-signup', new localStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            process.nextTick(function () {
                User.findOne({
                    'local.username': email
                }, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email already taken'));
                    } else {
                        var newUser = new User();
                        newUser.local.username = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        })
                    }

                })
            });
        }));

    passport.use('local-login', new localStrategy({
            usernameField: 'email',
            passwordFiled: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            process.nextTick(function () {
                User.findOne({
                    'local.username': email
                }, function (err, user) {
                    if (err)
                        return done(err);
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No User found'));
                    if (!user.validPassword(password))
                        return done(null, false, req.flash('loginMessage', 'Invalid password'));
                    return done(null, user);
                })
            })
        }
    ))
    passport.use(new FacebookStrategy({
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: keys.facebook.callbackURL
    },
    function (token, refreshToken, profile, done) {
        console.log(profile)
        process.nextTick(function () {
            User.findOne({
                'facebook.id': profile.id
            }, function (err, user) {
                if (err)
                    return done(err)
                if (user) {
                    return done(null, user)
                } else {
                    var newUser = new User()

                    newUser.facebook.id = profile.id
                    newUser.facebook.token = token
                    newUser.facebook.name = profile.displayName

                    newUser.save(function (err) {
                        if (err)
                            throw err
                        return done(null, newUser)
                    })
                }
            })
        })
    }
))

};