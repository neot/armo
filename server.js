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
var server = http.createServer(function(req, res) {
	var page = url.parse(req.url).pathname;
	res.writeHead(200);
	    res.end(page);
});
server.listen(port, ip, function(){});
