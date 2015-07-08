var socket = io.connect('http://localhost/chat');

$('#m').keypress(function(e) {
    //e.preventDefault();
    if(e.which == 13) {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false; 
    }
});

function join () {
    console.log('firing join');
    var $usr = $('#user');
    var $jbtn = $('#join');
    var usr = $usr.val();

    if(!usr){ return false; }

    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
    
    socket.on('private message', function(from, msg){

        $('#p-messages').append($('<li>').text(from + ': ' + msg));
    });

    $usr.hide();
    $jbtn.hide();
}
