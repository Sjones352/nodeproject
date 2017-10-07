 'use strict';

 var http = require('http');
 var fs = require('fs');
 var path = require('path');
 var url = require('url');
 var rootDir = __dirname + '/public';


 const mimeType = {
 	'html': 'text/html',
 	'jpeg': 'image/jpeg',
 	'jpg': 'image/jpeg',
 	'png': 'image/png',
 	'js': 'text/javascript',
 	'css': 'text/css'
 };

 function send404Request(res) {
 	fs.readFile('./404.html', 'UTF-8', function(err, html) {
 		res.setHeader('Content-type', mimeType || 'text/html');
 		res.end(html);
 	});

 }

 function onRequest(req, res) {

 	var filename;
 	var pathname = url.parse(req.url).pathname;
 	filename = path.join(rootDir, pathname);
 	console.log('Filename: ' + filename);

 	if (req.method === 'GET' && req.url === '/') {
 		res.setHeader('Content-type', mimeType || 'text/html');
 		fs.createReadStream('public/index.html').pipe(res);
 	} else if (req.url) {
 		res.setHeader('Content-type', mimeType || 'text/html');
 		fs.createReadStream(filename).pipe(res);
 	} else {
 		send404Request(res);
 	}

 }


 http.createServer(onRequest).listen(3000);
 console.log('Starting Server');