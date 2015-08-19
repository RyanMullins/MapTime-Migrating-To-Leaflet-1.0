// ---- Modules ----

var finalhandler = require('finalhandler'),
    http = require('http'),
    serveStatic = require('serve-static'),
    port = 4000;

// ---- Local Variables ----

var serve = serveStatic('client')

// ---- HTTP Server ----

http.createServer(function (req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
}).listen(port);

console.log("HTTP server running at localhost:" + port);