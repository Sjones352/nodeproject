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
<<<<<<< HEAD
     if (err) {
       res.writeHead(500);
       res.write("Internal Server Error");
     } else {
       res.writeHead(404, {
         'Content-type': mimeType
       });
       res.end(html);
     }
=======
     res.setHeader('Content-type', mimeType);
     res.end(html);
>>>>>>> 945100f8f04e33242f280c0f03422c5c690fe44b
   });
 }

 function onRequest(req, res) {
<<<<<<< HEAD
   console.log('request starting....');
=======
   console.log('request starting...');
>>>>>>> 945100f8f04e33242f280c0f03422c5c690fe44b

   var filename;
   var pathname = url.parse(req.url).pathname;
   filename = path.join(rootDir, pathname);
   console.log('Filename: ' + filename);
<<<<<<< HEAD
   var stream = fs.createReadStream(filename);
=======
>>>>>>> 945100f8f04e33242f280c0f03422c5c690fe44b

   if (req.method !== 'GET') {
     res.writeHead(405, {
       "Content-type": "text/plain"
     });
     res.write(`HTTP method ${req.method} not yet supported`);
     res.end();
     return
   }

   if (req.url === '/') {
<<<<<<< HEAD
     fs.readFile('public/index.html', 'UTF-8', function(err, html) {
       if (err) {
         res.writeHead(500);
         res.write("Internal Server Error");
       } else {
         res.writeHead(200, {
           'Content-type': mimeType
         });
         res.end(html);
         return
       }
     });
   }

   stream.on('error', function(error) {

     send404Request(res);
   });

   // if File exists, stream it to user
   res.writeHead(200);
   stream.pipe(res);
 };
=======
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
>>>>>>> 945100f8f04e33242f280c0f03422c5c690fe44b


 http.createServer(onRequest).listen(3000);
 console.log('Starting Server');