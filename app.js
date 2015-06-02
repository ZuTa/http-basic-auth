var auth = require('http-auth');
var express = require('express');
var http = require('http');

var basic = auth.basic({
  realm: "This is Products Area."
  },
  function (username, password, callback) {
    callback(username === "user" && password === "password");
  }
);

var app = express();

app.set('port', (process.env.PORT || 5000));
app.get('/feed/:name', function(req, res) {
  var options = {
    root: __dirname + '/public/',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent: ', fileName);
    }
  });
});

http.createServer(basic, app).listen(app.get('port'), function() {
  console.log('Server running at http://127.0.0.1:' + app.get('port'));
});
