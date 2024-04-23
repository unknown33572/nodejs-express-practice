const morgan = require('morgan');
const request = require('request');
const express = require('express');
const app = express();

app.set('port', 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({express: true}));

app.get('/naver/news', (req, response) => {
  const clientId = 'a';
  const clientPw = 'a';
  const api_url = 'https://openapi.naver.com/v1/search/news?query=' + encodeURI('게임');

  const option = {};

  const options = {
    url: api_url,
    qs: option,
    headers: {
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientPw
    },
  };

  request.get(options, (err, res, body) => {
    if(!err && res.statusCode == 200) {
      let obj = JSON.parse(body).items;

      const result = {
        title: [],
        link: [],
        description: [],
        pubDate: []
      };

      for (let i = 0; i < obj.length; i++) {
        result.title.push(obj[i].title);
        result.link.push(obj[i].link);
        result.description.push(obj[i].description);
        result.pubDate.push(obj[i].pubDate);
      }

      response.json(result);
    } else {
      response.status(res.statusCode).end();
    }
  });
});

app.listen(app.get('port'), () => {
  console.log('Server is running on http://localhost:' + app.get('port'));
});