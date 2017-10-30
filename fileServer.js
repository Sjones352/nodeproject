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

 function generate500error(response, errorMessage) {
   response.writeHead(500, {"Content-Type": "text/plain"});

   response.write(`Server cannot process the request: ${errorMessage}`);
   // Log the error message for the opearations people
   console.log(`Server cannot process the request: ${errorMessage}`);
   // Show which function called us and which file and LINE the call was made from
   response.end()
   return;
 }

 function send404Request(response) {
   fs.readFile('public/404.html', 'UTF-8', function(err, html) {
     if (err) {
       generate500error(response, "500 Internal Server Error");
     } else {
       response.writeHead(404, {
         'Content-type': 'text/html'
       });
       response.end(html);
     }
   });
 }

 function onRequest(req, response) {
   console.log(`${req.method} ${req.url}`);

   var pathname = url.parse(req.url).path;

   var fileName = path.join(rootDir, pathname);

   // Used path.extname(path) method
   var headers = {
     'Content-type': String(mimeType[path.extname(fileName).split(".").pop()]
   )};

   var stream = fs.createReadStream(fileName);

   if (req.method !== 'GET') {
     response.writeHead(405, {
       "Content-type": 'text/plain'
     });
     response.write(`HTTP method ${req.method} not yet supported`);
     response.end();
     return;
   }

   if (req.url === '/') {
     fs.readFile('public/index.html', 'UTF-8', function(err, html) {

       if (err) {
         generate500error(response);
       } else {
         response.writeHead(200, headers);
         response.end(html);
         return;
       }
     });
   }

   stream.on('error', function(error) {
     if (error) {
       send404Request(response);
     }
   });

   // if File exists, stream it to user
   response.writeHead(200, headers);
   stream.pipe(response);
 };


 http.createServer(onRequest).listen(3000);
 console.log('Starting Server');