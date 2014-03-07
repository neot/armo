var url = require('url');
var http = require('http');

var home = require('./controller/home');
var quota = require('./controller/quota');
var request = require('./controller/request');
var git = require('./controller/git');
var basicAuth = require('./lib/basic-auth');

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


var server = http.createServer(function(req, res) {
  basicAuth.isauthenticated(req, function(err){
    if(err){
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
      return res.end();
    }
    var page = url.parse(req.url).pathname;
    var msg='';
    if(page === '/'){
      msg = home.dowork();
      res.writeHead(200);
      res.end(msg);
    }else if(page === '/quota'){
      quota.dowork(function(err, out){
        if(err){
          res.writeHead(500);
          return res.end(err.message);
        }
        res.writeHead(200);
        res.end(out);
      });
    }else if(page.match(/\/request\/.*/)){
      request.dowork(page.substr(page.lastIndexOf('/')+1), function(err , statusCode, body){
        if(err){
          res.writeHead(500);
          return res.end(err.message);
        }
        res.writeHead(statusCode);
        res.end(body);
      });
    }else if(page === '/git'){
      git.dowork(function(err, out){
        if(err){
          res.writeHead(500);
          return res.end(err.message);
        }
        res.writeHead(200);
        res.end(out);
      });
    }else{
      res.writeHead(404);
      res.end(404);
    }
  });
});
server.listen(port, ip, function(err){
  if(err){
    console.error(err);
  }
});
