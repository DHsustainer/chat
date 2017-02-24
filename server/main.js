var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [{
    id: 1,
    text: "Hola soy un mensaje",
    author: "Daniel Herrera"
}]

app.use(express.static('public'));

app.get('/hello',function (req, res) {
    res.status(200).send('hello world!');
});

io.on('connection', function (socket) {
    console.log('alguien se ha conectado con Sockets');
    socket.emit('messages', messages);
    socket.on('message', function (data) {
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});

server.listen(5000, function(){
  console.log('server listen on: 8000 port');
});