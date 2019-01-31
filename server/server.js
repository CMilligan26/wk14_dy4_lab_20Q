var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.on('question', (question) => {
    io.sockets.emit('question', question);
  })
  socket.on('answer', (answer) => {
    io.sockets.emit('answer', answer);
  })
  socket.on('celeb', (celeb) => {
    io.sockets.emit('celeb', celeb);
  })
})

app.get('/', function (req, res) {
  res.send("Server running");
});

app.use(express.static('client/build'));

var server = http.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
