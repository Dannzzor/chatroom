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
        var msgEl = $('<div class="event">'+
              '<div class="label">'+
                '<img src="/images/Cat.png">'+
              '</div>'+
              '<div class="content">'+
                '<div class="summary">'+
                  msg +
                  '<div class="date">'+
                    '1 Hour Ago'+
                  '</div>'+
                '</div>'+
                '<div class="meta">'+
                  '<a class="like">'+
                    '<i class="like icon"></i>'+ (Math.floor(Math.random(10)*10)) +' Likes'+
                  '</a>'+
                '</div>'+
              '</div>'+
            '</div>');
        $('#p-messages').append(msgEl);
    });

    $usr.hide();
    $jbtn.hide();
}
