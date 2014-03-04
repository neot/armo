var fs = require('fs);
fs.writeFileSync("/var/lib/openshift/5315a46d5973ca221c0002b1/mynode.log", "running", "UTF-8");
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

var http = require('http');
var server = http.createServer(function(req, res) {
	  res.writeHead(200);
	    res.end('working');
	    fs.writeFileSync("~/node.log", "res", "UTF-8");
});
server.listen(port, ip, function(){]);
