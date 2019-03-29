var express = require('express');
var app = express();
var io = require('socket.io')();

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (rep, res) => {
    res.sendfile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

io.attach(server);

//socket
io.on('connection', function(socket){
    console.log('a user has connect!');
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'} );
    io.emit('connceted', socket.id + ' join in the chat channel');

    socket.on('chat message', function(msg){
        console.log('message:', msg, 'socket:', socket.id);

        io.emit('chat message', {id:`${socket.id}`, message: msg });

    });

    socket.on('disconnect', function(){
        console.log('a user has diconnect!');
        io.emit('disconnect', socket.id + ' left the chat channel');
    });
});