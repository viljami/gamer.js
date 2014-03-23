var connect = require('connect');
var http = require('http');
var port = 3000;

var app = connect()
    .use(connect.static('node_modules/three'))
    .use(connect.static('projects'))
    .use(connect.directory('projects'))
    .use(connect.cookieParser())
    .use(connect.session({ secret: 'Use the force, Luke.' }));

http.createServer(app).listen(port);
console.log('Gamer.js started at: http://localhost:' + port);
