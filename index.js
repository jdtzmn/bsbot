var express = require('express');
var app = express();

app.use(express.static(__dirname + '/www/dist'));

console.log('Listening on port: 3000');

app.listen(3000);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/www/index.html');
});
