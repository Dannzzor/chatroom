var socket = io();
var pmsg;
$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

$('#join').click(join);

function join () {
  var $usr = $('#user');
  var $jbtn = $('#join');
  var usr = $usr.val();
  if(!usr){return false;}
  pmsg = io.connect('http://localhost/user.' + usr);
  pmsg.on('connect', function () {
    pmsg.emit('connected to private chat');
  });
  pmsg.on('private message', function(msg){
    $('#p-messages').append($('<li>').text(msg));
  });
  $usr.hide();
  $jbtn.hide();
}