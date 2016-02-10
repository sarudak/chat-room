var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var chatHistory = ['The admin asks you to keep things civil'];

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.username = 'guest';
  socket.on('getHistory', function(){
    console.log('getting history');
    console.log(chatHistory);
    for (index = 0; index < chatHistory.length; index++) {
      console.log(chatHistory[index]);
      socket.emit('chat message', chatHistory[index]);
    } 
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

http.listen(3000, function(){
  console.log('listening on *:3000');
});
