var express = require('expresss');

var home = require('./controller/home');
var quota = require('./api/quota');
var request = require('./api/request');
var git = require('./api/git');

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var app = express();

app.use(express.basicAuth(function(user, pass, callback) {
  var result = (user === 'nestor' && pass === 'tintin');
  callback(null, result);
}));



app.get('/', function(req, res){
  res.writeHead(200);
  res.end(home.dowork());
});
app.get('/quota', function(req, res){
  quota.dowork(function(err, out){
    if(err){
      res.writeHead(500);
      return res.end(err.message);
    }
    res.writeHead(200);
    res.end(out);
  });
});
app.get('/request/:site', function(req, res){
  request.dowork(req.params.site, function(err , statusCode, body){
    if(err){
      res.writeHead(500);
      return res.end(err.message);
    }
    res.writeHead(statusCode);
    res.end(body);
  });
});
app.get('/git', function(req, res){
  git.dowork(function(err, out){
    if(err){
      res.writeHead(500);
      return res.end(err.message);
    }
    res.writeHead(200);
    res.end(out);
  });
});
app.use(function(req, res){
  res.writeHead(404);
  res.end(404);
});
app.listen(port, ip);
