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
  'css': 'text/css',
  'svg': 'image/svg+xml',
  'ico': 'image/x-icon',
  'gif': 'image/gif',
};

function generate500error(response) {
  var err = new Error();
  fs.readFile('public/500.html', 'UTF-8', function(error, html) {
    if (error) {
      throw err;
    }
    response.writeHead(500, {
      'Content-Type': 'text/html'
    });
    console.log(`Server cannot process the request: 500 internal error`);

    console.error(err.stack);
    response.end(html);
    return;
  });
}

function send404Request(response) {
  fs.readFile('public/404.html', 'UTF-8', function(error, html) {
    if (error) {
      generate500error(response);
    } else {
      response.writeHead(404, {
        'Content-type': 'text/html'
      });
      response.end(html);
    }
  });
}

function onRequest(request, response) {
  console.log(`${request.method} ${request.url}`);

  var pathname = url.parse(request.url).path;

  var fileName = path.join(rootDir, pathname);

  // Used path.extname(path) method
  var headers = {
    'Content-type': String(mimeType[path.extname(fileName).split('.').pop()])
  };

  var stream = fs.createReadStream(fileName);

  if (request.method !== 'GET') {
    response.writeHead(405, {
      'Content-type': 'text/plain'
    });
    response.write(`HTTP method ${request.method} not yet supported`);
    response.end();
    return;
  }

  if (request.url === '/') {
    fs.readFile('public/index.html', 'UTF-8', function(error, html) {

      if (error) {
        var timeout = setTimeout(function() {
        console.log("Sending 504 error to client: Server Timeout");
        response.writeHead(504, {
          'Content-Type': 'text/plain'
        });
        response.write(`Sending 504 error to client :Server Timeout`);
        response.end();
    }, 500);

      } else {
        response.writeHead(200, headers);
        response.end(html);
        return;
      }
    });
  }

  stream.on('error', function(error) {
    if (error) {
      return send404Request(response);
    }
  });

  // if File exists, stream it to user
  response.writeHead(200, headers);
  stream.pipe(response);

};


http.createServer(onRequest).listen(3000);
console.log('Starting Server');