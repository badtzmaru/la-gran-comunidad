var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 80;

setInterval(function () {
    io.emit('total users', io.engine.clientsCount);
}, 1000);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
    setTimeout(() => {
        io.emit('update');
    }, 3000);

});