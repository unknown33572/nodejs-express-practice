const morgan = require('morgan');
const models = require('./models');

const express = require('express');
const app = express();

app.set('port', 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  models.newCustomer.findAll().then((customers) => {
    res.send(customers);
  }).catch((err) => {
    console.error(err);
    next(err);
  });
});

app.get('/customer', (req, res) => {
  res.sendFile(__dirname + '/nodejs_study02.html');
});

app.post('/customer', (req, res) => {
  let body = req.body;

  models.newCustomer.create({
    name: body.name,
    age: body.age,
    email: body.email,
  }).then(result => {
    console.log(result);
    res.redirect('/customer');
  }).catch(err => {
    console.error(err);
  });
});

app.listen(app.get('port'), () => {
  console.log('Server is listening on port', app.get('port'));
});