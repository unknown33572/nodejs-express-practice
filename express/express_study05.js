const express = require('express');
const app = express();

// app.get('/:type', (req, res) => {
//   let { type } = req.params;
//   res.send(type);
// });

// app.listen(8080, () => {
//   console.log('Server is running on http://localhost:8080');
// });

app.set('port', 8080);

// app.use(morgan('dev')); // 로그 출력
app.use(express.json()); // json 형식으로 데이터를 받음
app.use(express.urlencoded({express: true})); // form 형식으로 데이터를 받음

let boardList = [];
let numOfBoard = 0;

app.get('/', (req, res) => {
  res.send('This is api.js');
});

app.get('/board/all', (req, res) => {
  res.json(boardList);
});

app.get('/board/:id', (req, res) => {
  const findItem = boardList.find((item) => {
    return item.id == +req.params.id;
  });
  res.json(findItem);
});

app.post('/board', (req, res) => {
  const board = {
    'id': ++numOfBoard,
    'user_id': req.body.user_id,
    'title': req.body.title,
    'content': req.body.content
  };
  boardList.push(board);

  res.redirect('/board');
});

app.put('/board/:id', (req, res) => {
  const findItem = boardList.find((item) => {
    return item.id == +req.params.id;
  });
  const idx = boardList.indexOf(findItem);
  boardList.splice(idx, 1);

  const board = {
    'id': +req.params.id,
    'user_id': req.body.user_id,
    'title': req.body.title,
    'content': req.body.content
  };
  boardList.push(board);

  res.redirect('/board');
});

app.delete('/board/:id', (req, res) => {
  const findItem = boardList.find((item) => {
    return item.id == +req.params.id;
  });
  const idx = boardList.indexOf(findItem);
  boardList.splice(idx, 1);

  res.redirect('/board');
});

app.listen(app.get('port'), () => {
  console.log('Server is running on 8080');
});

