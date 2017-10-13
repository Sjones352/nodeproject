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
   fs.readFile('public/404.html', 'UTF-8', function(err, html) {
     res.setHeader('Content-type', mimeType);
     res.end(html);
   });
 }

 function onRequest(req, res) {
   console.log('request starting...');

   var filename;
   var pathname = url.parse(req.url).pathname;
   filename = path.join(rootDir, pathname);
   console.log('Filename: ' + filename);

   if (req.method !== 'GET') {
     res.writeHead(405, {
       "Content-type": "text/plain"
     });
     res.write(`HTTP method ${req.method} not yet supported`);
     res.end();
     return
   }

   if (req.url === '/') {
     res.writeHead(200, {
       'Content-type': mimeType
     });
     fs.createReadStream('public/index.html').pipe(res);
   }

   fs.exists(filename, function(exists) {

     if (exists) {
       fs.readFile(filename, function(error, content) {
         res.writeHead(200, {
           'Content-type': mimeType
         });
         res.end(content, 'utf-8');

       });
     } else {
       send404Request(res);
     }
   });
 }


 http.createServer(onRequest).listen(3000);
 console.log('Starting Server');