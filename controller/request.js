var http = require('http');

var dowork = function(site, cb){
  var options = {
    hostname: site,
    port: 80,
    path: '/',
    method: 'GET'
  };
  var req = http.request(options, function(resp){
    resp.setEncoding('utf8');
    var chunks = [];
    resp.on('data', function(chunk){
      chunks.push(chunk);
    });
    resp.on('end', function(){
      cb(null, resp.statusCode, chunks.join(''));
    });
  });

  req.on('error', function(e){
    if(e.message === 'getaddrinfo ENOTFOUND'){
      cb(new Error('Not Found'), 404);
    }else{
      cb(e);
    }
  });
  req.end();
};
exports.dowork = dowork;
