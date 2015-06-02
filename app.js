var auth = require('http-auth');
var express = require('express');
var http = require('http');

var basic = auth.basic({
  realm: "Simon Area."
  },
  function (username, password, callback) { // Custom authentication method.
    callback(username === "ZuTa" && password === "Power");
  }
);

var app = express();
app.set('port', (process.env.PORT || 5000));
app.get('/', function(req, res) {
  res.end("Welcome to private area - " + req.user + "!");
});

http.createServer(basic, app).listen(app.get('port'), function() {
  console.log('Server running at http://127.0.0.1:' + app.get('port'));
});
