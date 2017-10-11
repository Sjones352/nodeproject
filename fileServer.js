 'use strict';

 var http = require('http');
 var fs = require('fs');
 var path = require('path');
 var url = require('url');
 var rootDir = __dirname + '/public';

 const mimeType = {
  'html': 'text/html',
  'jpeg': 'image/jpeg',
  'jpg':  'image/jpeg',
  'png':  'image/png',
  'js':   'text/javascript',
  'css':  'text/css'
 };

 function send404Request(res) {
 	fs.readFile('public/404.html', 'UTF-8', function(err, html) {
 		res.setHeader('Content-type', mimeType || 'text/html');
 		res.end(html);
 	});

 }

 function onRequest(req,res) {
  console.log('request starting...');
  
 	var filename;
 	var pathname = url.parse(req.url).pathname;
 	filename = path.join(rootDir, pathname);
 	console.log('Filename: ' + filename);

   // General rules of code logic
   // * Validate incoming data first; return errors and exit if not valid
   // * Handle special cases
   // * Handle expected happy path - logic path that fulfills the 
   //     business requirements for the code


   // If HTTP method is not GET, return 405 with error message
   if (req.method !== 'GET') {
   	res.writeHead(405, {"Content-type": "text/plain"});
   	res.write(`HTTP method ${req.method} not yet supported`);
   	res.end();
   	return
   }
   // if URL is '/', return public/index.html with a 200 status code
   if (req.url === '/') {
   	 res.writeHead(200, {'Content-type': mimeType || 'text/html'});
 	   fs.createReadStream('public/index.html').pipe(res);
   }
    
   // return public/404.html with a 404 status code 
   //    if URL doesn't map to a file under public/ 
  
   // Get MIME type for file and set Content-Type header
   // Read file into memory
   // Return file contents to user with 200 status code

 	// var filename;
 	// var pathname = url.parse(req.url).pathname;
 	// filename = path.join(rootDir, pathname);
 	// console.log('Filename: ' + filename);

 	// if (req.method === 'GET' && req.url === '/') {
 	// 	res.setHeader('Content-type', mimeType || 'text/html');
 	// 	fs.createReadStream('public/index.html').pipe(res);
 	// } else if (req.url) {
 	// 	res.setHeader('Content-type', mimeType || 'text/html');
 	// 	fs.createReadStream(filename).pipe(res);
 	// // } else {
 	// // 	send404Request(res);
 	// }

 }


 http.createServer(onRequest).listen(3000);
 console.log('Starting Server');