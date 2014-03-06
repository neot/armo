if(typeof process.env.OPENSHIFT_NODEJS_PORT === 'undefined'){
	var port = 8080;
}
else
{
	var port = process.env.OPENSHIFT_NODEJS_PORT;
}
if(typeof process.env.OPENSHIFT_NODEJS_IP === 'undefined'){
  var ip = '0.0.0.0';
}
else
{
  var ip = process.env.OPENSHIFT_NODEJS_IP;
}

var url = require('url');
var http = require('http');
var home = require('./controller/home');
var quota = require('./controller/quota');
var request = require('./controller/request');
var git = require('./controller/git');
var util = require('util');
var basicAuth = require('./lib/basic-auth');

var server = http.createServer(function(req, res) {
  basicAuth.isauthenticated(req, function(){
    var page = url.parse(req.url).pathname;
    var msg='';
    if(page == '/'){
		  msg = home.dowork();
		  res.writeHead(200);
      res.end(msg);
    }
    else if(page == '/quota'){
		  quota.dowork(
        function(out){
          msg=out;
          res.writeHead(200);
          res.end(msg);
        });
    }
    else if(page.match('/request/.*')){
		  request.dowork(page.substr(page.lastIndexOf('/')+1), function(out){
        res.writeHead(200);
        msg = out;
        res.end(msg);
      });
    }
    else if(page == '/git'){
      git.dowork(
        function(out){
          msg=out;
          res.writeHead(200);
          res.end(msg);
        });
    }
    else{
		  res.writeHead(404);
		  msg = '404';
      res.end(msg);
    }
  }, function(code, h1, h2){
    res.statusCode =code;
    res.setHeader(h1, h2);
  });
});
server.listen(port, ip, function(){});
