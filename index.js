var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use('/', express.static('public'));

var chat = io
    .of('/chat')
    .on('connection', function(socket){
        socket.broadcast.emit('chat message', 'a user connected');
        socket.on('disconnect', function(){
            console.log('a user has disconnected');
        });
        socket.on('chat message', function(from, msg){
            if(msg.match('@')){

                var usr = msg.match(/@.+?\s/g)[0];
                msg = msg.slice(usr.length);
                usr = usr.substr(1);
                usr = usr.trim();

                chat.emit('private message', usr, msg);
            } else {
                chat.emit('chat message', from, msg);
            }
        });
    });

server.listen(3000, function(){
    console.log('listening on *:3000');
});
