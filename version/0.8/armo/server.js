var express = require('express');

var home = require('./controller/home');
var public = require('controller/public');
var quota = require('./api/quota');
var request = require('./api/request');
var git = require('./api/git');

var port = process.env.OPENSHIFT_ARMO_PORT || 8080;
var ip = process.env.OPENSHIFT_ARMO_IP || '0.0.0.0';
var user = process.env.OPENSHIFT_ARMO_USER || "admin";
var password = process.env.OPENSHIFT_ARMO_PASSWORD || "admin";
var app = express();

app.use(express.basicAuth(function(usr, pswd, callback) {
  var result = (usr === user && pswd === password);
  callback(null, result);
}));
app.use('/', express.static('./public'));

app.get('/:file', function(req,res){
  public.getFile(req.params.site, function(err, content){
    if(err){
      if(err=="file not found"){
        res.writeHead(400);
        return res.end("<h1>404</h1>File Not Found");
      }
      res.writeHead(500);
      return res.end("<h1>500</h1>Unknown Error");
    }
    res.writeHead(200);
    return res.rend(content);
  });
});

app.get('/', function(req, res){
  console.log(req);  
  res.writeHead(200);
  res.end(home.dowork());
});
app.get('/quota', function(req, res){
  console.log(req);  
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
