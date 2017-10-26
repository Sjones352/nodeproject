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

 function generate500error(res, errorMessage) {
   if (errorMessage === 'Internal Server Error') {
     res.writeHead(500);
     res.write(`We encounted an ${errorMessage} and will not run`);
     return;
   }
 }

 function send404Request(res) {
   fs.readFile('public/404.html', 'UTF-8', function(err, html) {
     if (err) {
       generate500error(errorMessage);
     } else {
       res.writeHead(404, {
         'Content-type': 'text/html'
       });
       res.end(html);
     }
   });
 }

 function onRequest(req, res) {
   console.log(`${req.method} ${req.url}`);

   var pathname = url.parse(req.url).path;


   var fileName = path.join(rootDir, pathname);

   // Used path.extname(path) method
   var headers = {
     'Content-type': (mimeType[path.extname(fileName).split(".").pop()]
   };


   var stream = fs.createReadStream(fileName);

   if (req.method !== 'GET') {
     res.writeHead(405, {
       "Content-type": 'text/plain'
     });
     res.write(`HTTP method ${req.method} not yet supported`);
     res.end();
     return;
   }

   if (req.url === '/') {
     fs.readFile('public/index.html', 'UTF-8', function(err, html) {

       if (err) {
         generate500error(errorMessage);
       } else {
         res.writeHead(200, headers);
         res.end(html);
         return;
       }
     });
   }

   stream.on('error', function(error) {
     if (error) {
       send404Request(res);
     }
   });

   // if File exists, stream it to user
   res.writeHead(200, headers);
   stream.pipe(res);
 };


 http.createServer(onRequest).listen(3000);
 console.log('Starting Server'); 