var url = require('url');
var http = require('http');
var express = require('express');

var home = require('./controller/home');
var quota = require('./controller/quota');
var request = require('./controller/request');
var git = require('./controller/git');
var basicAuth = require('./lib/basic-auth');

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

/*basicAuth.isauthenticated(req, function(err){
  if(err){
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
    return res.end();
  }*/
  var app = express();
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
  app.use(function(req, res, next){
    res.writeHead(404);
    res.end("404");
  });
//});
app.listen(port);
