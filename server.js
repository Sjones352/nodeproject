 'use strict';

 var http = require('http');
 var url = require('url');
 var fs = require('fs');
 var path = require('path');

 var host = "127.0.0.1";
 const port = 1337;

 const server = http.createServer(function(req, res) {
   console.log("Recieved request:" + res.url);

   const parsedUrl = url.parse(req.url);
   let pathname = `.${parsedUrl.pathname}`;
   const mimeType = {
     '.html': 'text/html',
     '.css': 'text/css'
   };

   if (fs.statSync(pathname).isDirectory()) {
     pathname +='/index.html';
   }

   if (fs.statSync(pathname).isDirectory()) {
     pathname += 'css/style.css';
   }

   if (fs.statSync(pathname).isDirectory()) {
     pathname += '/foo.html';
   }

   fs.readFile(pathname, function(err, data) {
     if (err) {
       res.statusCode = 404;
       res.end(`Error getting the file: ${err}.`);
     } else {
       const ext = path.parse(pathname).ext;
       res.setHeader('Content-type', mimeType[ext] || 'text/html');
       res.end(data);
     }
   });
 });

 server.listen(port, host, function() {
   console.log("Listening " + host + ":" + port);
 });