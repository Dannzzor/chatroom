var socket = io.connect('http://localhost/chat');



function join () {
    console.log('firing join');
    var $usr = $('#user');
    var $jbtn = $('#join');
    var usr = $usr.val();

    if(!usr){ return false; }

    var a = new Date();
    var hours = a.getHours();
    var minutes = a.getMinutes();
    var timestamp = (hours > 12 ? hours - 12 : hours) + ':' + minutes + ' ' + (hours > 12 ? 'pm' : 'am');

    socket.on('chat message', function(from, msg){
        var msgEl = $('<div class="event">'+
              '<div class="label">'+
                '<img src="/images/Cat.png">'+
              '</div>'+
              '<div class="content">'+
                '<div class="summary">'+
                    from +
                  '<div class="date">'+
                    timestamp +
                  '</div>'+
                '</div>'+
                '<div class="meta">'+
                  msg +
                '</div>'+
              '</div>'+
            '</div>');
        $('#messages').append(msgEl);
    });
    
    socket.on('private message', function(from, msg){
        var msgEl = $('<div class="event">'+
              '<div class="label">'+
                '<img src="/images/Cat.png">'+
                from +
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

    $('#m').keypress(function(e) {
        if(e.which == 13) {
            socket.emit('chat message', usr, $('#m').val());
            $('#m').val('');
            return false; 
        }
    });

    $usr.hide();
    $jbtn.hide();
}
