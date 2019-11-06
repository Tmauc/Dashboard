var express = require('express')
var app = express()

app.use('/assets/css', express.static('./assets/css'));
app.use('/assets/scss', express.static('./assets/scss'));
app.use('/assets/images', express.static('./assets/images'));
app.use('/assets/vendor', express.static('./assets/vendor'));
app.use('/assets/js', express.static('./assets/js'));

app.use('/public', express.static('./public'))

app.get('/', function (req, res) {
  res.sendfile('./public/index.html')
})

app.listen(8081, function () {
  console.log('app listening on port 8081!')
})