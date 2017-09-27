 var http = require('http');
 console.log("starting");
 var host = "127.0.0.1";
 var port = 1337;

 //create a server object:
 var server = http.createServer(function(req, res) {
 	console.log("Recieved request:" + res.url);
 	res.writeHead(200, {
 		"mimeType": "text/html"
 	});
 	console.log(req.method);
 	console.log(req.headers);
 	console.log(req.url);
 	res.end('Hello World');
 });
 server.listen(port, host, function() {
 	console.log("Listening " + host + ":" + port);
 });