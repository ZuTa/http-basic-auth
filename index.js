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
app.get('/', function(req, res) {
  res.end("Welcome to private area - " + req.user + "!");
});

http.createServer(basic, app).listen(1337, function() {
  console.log('Server running at http://127.0.0.1:1337/');
});
