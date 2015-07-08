var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use('/', express.static('public'));

var pmsg = io.of('/user.jon');
pmsg.on('connection', function(socket){
  socket.broadcast.emit('private message', 'a user connected');
  socket.on('disconnect', function(){
    console.log('a user has disconnected');
  });
  socket.on('private message', function(msg){
    pmsg.emit('private message', msg);
  });
});

var pmsg2 = io.of('/user.dan');
pmsg2.on('connection', function(socket){
  socket.broadcast.emit('private message', 'a user connected');
  socket.on('disconnect', function(){
    console.log('a user has disconnected');
  });
  socket.on('private message', function(msg){
    pmsg2.emit('private message', msg);
  });
});


io.on('connection', function(socket){
  socket.broadcast.emit('chat message', 'a user connected');
  socket.on('disconnect', function(){
    console.log('a user has disconnected');
  });
  socket.on('chat message', function(msg){
    if(msg.match('@jon')){
      console.log('matched jon');
      pmsg.emit('private message', msg);
    } else if (msg.match('@dan')) {
      console.log('matched dan');
      pmsg2.emit('private message', msg);
    } else {
      io.emit('chat message', msg);
    }
  });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});