var connect = require('connect');
var http = require('http');
var port = 3000;

var app = connect()
app.use('/vendor', connect.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/vendor', connect.static(__dirname + '/node_modules/backbone'));
app.use('/vendor', connect.static(__dirname + '/node_modules/requirejs'));
app.use('/vendor', connect.static(__dirname + '/node_modules/jquery/dist'));
app.use('/vendor', connect.static(__dirname + '/node_modules/lodash/dist'));
app.use('/vendor', connect.static(__dirname + '/node_modules/hogan.js/web/builds/3.0.2'));
// app.use('/vendor', connect.static(__dirname + '/node_modules/three'));
app.use(connect.static('projects'));
app.use(connect.directory('projects'));
app.use(connect.cookieParser());
app.use(connect.session({ secret: 'Use the force, Luke.' }));


http.createServer(app).listen(port);
console.log('Gamer.js started at: http://localhost:' + port);
