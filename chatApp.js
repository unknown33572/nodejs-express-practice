const http = require('http');
const express = require('express');
const app = express();

const server = http.Server(app);

const io = require('socket.io')(server);

let users = [];

server.listen(8080, () => {
  console.log('server is running on port 8080');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chatRoom.html');
});

io.on('connection', (socket) => {
  let name = ''; // local variable to store the name of the user
  socket.on('has connected', (userName) => {
    name = userName;
    users.push(name);
    io.emit('has connected', { username: userName, users: users });
  });
  socket.on('disconnect',() => {
    users.splice(users.indexOf(name), 1);
    io.emit('has disconnected', { username: name, users: users });
  });

  socket.on('new message', (msg) => {
    io.emit('chat message', { username: name, message: msg.messagez });
  });
});
