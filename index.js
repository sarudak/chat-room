var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var chatHistory = [];
var port = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.username = 'guest';
  socket.on('getHistory', function(){
    for (index = chatHistory.length - 10; index < chatHistory.length; index++) {
      if(chatHistory[index] != null){
        socket.emit('chat message', chatHistory[index]);
      }
    }
     socket.emit('chat message', 'You are now connected as ' + socket.username);
     socket.emit('chat message', 'The administrator asks that you be cool')
});
  socket.on('username', function(username){
    socket.username = username;
  });
  socket.on('chat message', function(msg){
    var fullMessage = socket.username + ': ' + msg;
    chatHistory.push(fullMessage)
    io.emit('chat message', fullMessage);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
