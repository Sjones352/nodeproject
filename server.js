var http = require('http');
console.log("starting");
var host = "127.0.0.1";
var port = 1337;

//create a server object:
var server = http.createServer(function (req, res) {
	console.log("Recieved request:" + res.url);
    res.writeHead(200,{"Content-Type":"text/html"}); //write a response to the client
    res.end('Hello World!');
}); 
server.listen(port, host, function(){
  console.log("Listening " + host + ":" + port);
});