var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 80;

function updateUsers() {
    var total = io.engine.clientsCount;
    io.emit('total users', total);
    console.log(total);
}

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    updateUsers();

    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});

io.on('disconnect', function () {
    updateUsers();
});


http.listen(port, function () {
    console.log('listening on *:' + port);
});