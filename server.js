 var http = require('http');
 var fs = require('fs');
 console.log("starting");
 var host = "127.0.0.1";
 var port = 1337;

 //create a server object:
 var server = http.createServer(function(req, res) {
   fs.readFile('index.html', function(err, data) {
 	console.log("Recieved request:" + res.url);
 	res.writeHead(200, {
 		"Content-Type": "text/html"
 	});
 	console.log(req.method);
 	console.log(req.headers);
 	console.log(req.url);
 	return res.end();
   });
 });
 server.listen(port, host, function() {
 	console.log("Listening " + host + ":" + port);
 });