var express = require("express");
var app = express();
var port = 3700;
var fs = require('fs');

//app.set('views', __dirname + '/tpl');
//app.set('view engine', "jade");
//app.engine('jade', require('jade').__express);

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
//app.engine('view engine', "ejs");
app.use(express.static(__dirname + '/public'));
app.get("/", function(req, res){
res.render('main.html');
});

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
            
     
    socket.on('send', function (data) {
        io.sockets.emit('message', data);        
    });
});

console.log("Listening on port " + port);