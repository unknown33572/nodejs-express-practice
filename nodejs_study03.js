const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const app = express();

const WebSocket = require('./socket');

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
  res.sendFile(__dirname + '/nodejs_study04.html');
})

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 server 실행 중');
});

WebSocket(server);