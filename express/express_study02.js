const express = require("express");

const app = express();

app.set("port", 8080);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get("/user/:id?", (req, res) => {
  if (!req.params.id) {
    res.send("파라미터가 없습니다.");
  } else {
    res.send(req.params.id + "님 환영합니다.");
  }
});

app.listen(app.get("port"), () => {
  console.log("Server is running on http://localhost:" + app.get("port"));
});
