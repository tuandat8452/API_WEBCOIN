var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var database = require("./database");

app.get("/listUser", function (req, res) {
  database.getAllUser(function (resultQuery) {
    res.json(resultQuery);
  });
});

app.get("/add-user", function (req, res) {
  var id = req.query.id;
  var username = req.query.username;
  var email = req.query.email;
  var password = req.query.password;
  var phone = req.query.phone;
  database.addUser(
    id,
    username,
    email,
    password,
    phone,
    function (resultQuery) {
      res.json(resultQuery);
    }
  );
});

app.get("/login", function(req,res) {
    var email = req.query.email;
    var password = req.query.password;

    database.Login(email,password, function(resultQuery) {
        res.json(resultQuery);
    })
})

app.get("/candle", function (req, res) {
  database.getCandle(function (resQuery) {
    res.json(resQuery);
  });
});

app.listen(3000);
