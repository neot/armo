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
var home = require('./controller/home.js');
var quota = require('./controller/quota.js');
var request = require('./controller/request.js');

var server = http.createServer(function(req, res) {
	var page = url.parse(req.url).pathname;
	if(page == '/'){
		//msg = home.dowork();
		msg = page;
		res.writeHead(200);
	}
	else if(page == 'quota'){
		//msg = quota.do();
		res.writeHead(200);
	}
	else if(page == 'request'){
		//msg = request.do();
		res.writeHead(200);
	}
	else if(page == 'git'){

	}
	else{
		res.writeHead(404);
		msg = '404';
	}
	res.end(msg);
});
server.listen(port, ip, function(){});
