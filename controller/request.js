var net = require('net');
var http = require('http');
var util = require('util');
var dowork = function(site, cb){
  var options = {
    hostname: site,
    port: 80,
    path: '/',
    method: 'GET'
  };
  var req = http.request(options, function(resp){
      resp.setEncoding('utf8');
      resp.on('data', function(chunk){
        cb(util.format('%s %s', resp.statusCode, chunk));
      });
  });

  //req.on('error', function(e) {
  //    console.log('problem with request: ' + e.message);
  //});
  req.end();
};
exports.dowork = dowork;
