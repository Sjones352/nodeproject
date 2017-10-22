 'use strict';

 var http = require('http');
 var fs = require('fs');
 var path = require('path');
 var url = require('url');
 var rootDir = __dirname + '/public';

 var err = 'The server encountered an unexpected condition which prevented it from fulfilling the request.';

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
     if (err) {
       res.writeHead(500);
       res.write('Internal Server Error');
       console.log(err);
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

   
   var filename = path.join(rootDir, pathname);

   var headers = {'Content-type': String(mimeType[path.extname 
         (filename)])};

   var stream = fs.createReadStream(filename);

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
         res.writeHead(500);
         res.write('Internal Server Error');
         // console.log('status: ' + err);
       } else {
         res.writeHead(200, {
           'Content-Type': 'text/html'
         });
         res.end(html);
         return;
       }
     });
   }
 
   stream.on('error', function(error) {
    

     send404Request(res);

   });
   
   // if File exists, stream it to user
    res.writeHead(200,  headers );
   stream.pipe(res);
 };


 http.createServer(onRequest).listen(3000);
 console.log('Starting Server');