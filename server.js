var url = require('url');
var http = require('http');
var express = require('express');
var fs = require('fs');

var home = require('./controller/home');
var quota = require('./api/quota');
var request = require('./api/request');
var git = require('./api/git');
var basicAuth = require('./lib/basic-auth');

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var checkAuthentification = function(req, res){
  if(basicAuth.isauthenticatedSync(req)){
    return true;
  }
  res.statusCode = 401;
  res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
  res.end();
  return false;
};
 
var app = express();
app.get('/', function(req, res){
  if(checkAuthentification(req, res)){
    home.getPage(function(err, data){
      if(err){
        res.writeHead(500);
        return res.end(err.message);
      }
    res.writeHead(200);
    res.end(data);
    });
  }
});

app.get('/quota', function(req, res){
  if(checkAuthentification(req, res)){
    quota.dowork(function(err, out){
      if(err){
        res.writeHead(500);
        return res.end(err.message);
      }
      res.writeHead(200);
      res.end(out);
    });
  }
});

app.get('/request/:site', function(req, res){
  if(checkAuthentification(req, res)){
    request.dowork(req.params.site, function(err , statusCode, body){
      if(err){
        res.writeHead(500);
        return res.end(err.message);
      }
      res.writeHead(statusCode);
      res.end(body);
    });
  }
});

app.get('/git', function(req, res){
  if(checkAuthentification(req, res)){
    git.dowork(function(err, out){
      if(err){
        res.writeHead(500);
        return res.end(err.message);
      }
      res.writeHead(200);
      res.end(out);
    });
  }
});

app.get('/:file', function(req, res){
  if(checkAuthentification(req, res)){
    var file = req.params.file;
    console.log("req "+file);
    fs.readFile("./public/"+file, function(err, data){
      if(err){
        res.writeHead(500);
        return res.end(500);
      }
    res.writeHead(200);
    res.end(data);
    });
  }
});

app.use(function(req, res, next){
  if(checkAuthentification(req, res)){
    var page = url.parse(req.url).pathname;
    console.log("req "+page);
    fs.readFile("./public/"+page, function(err, data){
      if(err){
        res.writeHead(500);
        return res.end(500);
      }
    res.writeHead(200);
    res.end(data);
    });
  }
});

app.listen(port, ip);
