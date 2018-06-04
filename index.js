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
    }, 5000);

});

var adminTalk = process.openStdin();

adminTalk.addListener("data", function (d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that
    // with toString() and then trim()
    io.emit('chat message', {
        message: "[CONSOLE] " + d.toString().trim(),
        color: "#FE0101",
        user: ""
    });
});