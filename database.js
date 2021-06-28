var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mmotrade",
});

var connect = function () {
  connection.connect(function (err) {
    if (err) {
      console.log("Database connect error");
    }
    console.log("Database connected");
  });
};

var closeDb = function () {
  connection.end(function (err) {
    if (!err) {
      console.log("Closed db");
    }
  });
};

exports.getAllUser = function (callbackQuery) {
  connect();
  connection.query("SELECT * FROM tb_user", function (err, results, fields) {
    if (!err) {
      callbackQuery(results);
    } else {
      console.log(err);
    }
  });
};

exports.addUser = function (
  id,
  username,
  email,
  password,
  phone,
  callbackInsert
) {
  connect();
  connection.query(
    "INSERT INTO `tb_user` (`id`, `username`, `email`, `displayname`, `livebalance`, `bonusbalance`, `demobalance`, `robotbalance`, `playmode`, `win`, `lose`, `password`, `phone`, `status`, `activation_code`, `ref`, `parent`, `mfa`, `type`, `create_at`, `transferable`, `withdrawable`) VALUES ('" +
      id +
      "', '" +
      username +
      "', '" +
      email +
      "', '', '0', '0', '10000', '', 'DEMO', '0', '0', '" +
      password +
      "', '" +
      phone +
      "', 'VERIFY', '', '1', NULL, '0', 'NORMAL', current_timestamp(), 'ACTIVE', 'ACTIVE');",
    function (err, res, fields) {
      if (!err) {
        callbackInsert(res);
      } else {
        console.log(err);
      }
    }
  );
};

exports.Login = function (email, password, callbackLogin) {
  // var rs = false;
  connect();
  connection.query(
    "SELECT * FROM tb_user WHERE email ='" + email + "'",
    function (err, res, fields) {
      if (!err) {
        if (res.length > 0) {
          if (res[0].password == password) {
            // rs = true;
            callbackLogin(res);
          } else {
            // rs = false;
            callbackLogin("Không có dữ liệu");
          }
        } else {
          // rs = false;
          callbackLogin("Không có dữ liệu");
        }
      // callbackLogin(rs);
      } else {
        console.log(err);
      }
    }
  );
};

exports.getCandle = function (callbackQuery) {
  connect();
  connection.query("SELECT * FROM tb_candle", function (err, res, fields) {
    if (!err) {
      callbackQuery(res);
    } else {
      console.log(err);
    }
  });
};
