const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const app = express();
const socketIO = require('socket.io');



app.set('port', 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('wsExample'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'wsExample',
  cookie: {
    httpOnly: true,
    secure: false,
  }
}));

app.use('/', (req, res) => {
  res.sendFile(__dirname + '/index2.html');
});

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 server 실행 중');
});

function WebSocket(server) {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id, new Date());
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id, new Date());
    });
    socket.on('error', (error) => {
      console.error(error);
    });
    socket.on('from client', (data) => {
      console.log(data);
    });

    socket.interval = setInterval(() => {
      socket.emit('from server', new Date());
    }, 3000);
  });
}

WebSocket(server);