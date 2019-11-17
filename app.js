var express = require('express')
var app = express()
var nbport = process.env.PORT || 8080
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var request = require('request');
var nodeWidget = require('node-widgets');
var fs = require('fs');

var mongoDS = {'url': 'mongodb://mongo:27017/'};
mongoose.connect(mongoDS.url, {
    useNewUrlParser: true
});
require('./init/passport.js')(passport);
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: 'anystringoftext',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/assets/css', express.static('./assets/css'));
app.use('/assets/scss', express.static('./assets/scss'));
app.use('/assets/images', express.static('./assets/images'));
app.use('/assets/vendor', express.static('./assets/vendor'));
app.use('/assets/js', express.static('./assets/js'));

require('./routes/routes.js')(app, passport, request, nodeWidget, fs);

app.listen(8080, function () {
  console.log('app listening on port:' + nbport)
})