const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const app = express();

app.set('port', 8080);

let fakeUser = {
  username: 'test',
  password: '1234',
}

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('passportExample'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'passportExample',
  cookie: {
    httpOnly: true,
    secure: false,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log('serializeUser', user);
  done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser', id);
  done(null, fakeUser);
});

passport.use(new localStrategy(function(username, password, done) {
  if(username === fakeUser.username) {
    if(password === fakeUser.password) {
      return done(null, fakeUser);
    } else {
      return done(null, false, { message: 'Incorrect password' });
    }
  } else {
    return done(null, false, { message: 'Incorrect username' });
  }
}));

app.get('/', (req, res) => {
  if(!req.user) {
    res.sendFile(__dirname + '/index.html');
  } else {
    const user = req.user.username;
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Home</title>
    </head>
    <h1>Hello ${user}</h1>
    <button><a href="/logout">Logout</a></button>
    </html>
    `;
    res.send(html);
  }
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html'); // 로그인 폼을 제공하는 HTML 파일 경로
});

app.post('/login',
  passport.authenticate('local', {failureRedirect: '/'}),
  function(req, res) {
    res.send('Login success');
  }
);

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});