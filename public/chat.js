window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var board = document.getElementById("board");
    var name = document.getElementById("name");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br />';
            }
            if(html == null)
                {
                    html = '';
                }
            board.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    
    var sendMsg = function() {
        var text = new String(field.value);
        if(text.trim().length == 0)
            {
               return;
            }
        var user = new String(name.value);
        if(user.valueOf() == new String("null").valueOf() ||  user.trim().length == 0)
            {
                user = 'UNKOWN';
            }
        text = user + " : "+text;
        socket.emit('send', { message: text });

    };
    
    var enterPress = function(e){
        if(e.keyCode == 13){
            sendMsg();
        }
    }

    field.onkeypress = enterPress;
    
    sendButton.onclick = sendMsg;
   
}