"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mysql = require("mysql");

var dotenv = require('dotenv');

dotenv.config();
var instance = null;
var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});
connection.connect(function (err) {
  if (err) {
    console.log("DB Connection Error : " + err.message);
  } else console.log("db " + connection.state);
});

var DbService =
/*#__PURE__*/
function () {
  function DbService() {
    _classCallCheck(this, DbService);
  }

  _createClass(DbService, [{
    key: "getAllData",
    value: function getAllData() {
      var res;
      return regeneratorRuntime.async(function getAllData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                var query = "select * from names;";
                connection.query(query, function (err, results) {
                  if (err) {
                    reject(new Error(err.message));
                  } else resolve(results);
                });
              }));

            case 3:
              res = _context.sent;
              return _context.abrupt("return", res);

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }, {
    key: "insertNewName",
    value: function insertNewName(name) {
      var dateAdded, insertId;
      return regeneratorRuntime.async(function insertNewName$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              dateAdded = new Date();
              _context2.next = 4;
              return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                var query = "insert into names (name,date_added) values (?,?);";
                connection.query(query, [name, dateAdded], function (err, result) {
                  if (err) reject(new Error(err.message));
                  resolve(result.insertId);
                });
              }));

            case 4:
              insertId = _context2.sent;
              return _context2.abrupt("return", {
                id: insertId,
                name: name,
                dateAdded: dateAdded
              });

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }, {
    key: "updateRowById",
    value: function updateRowById(id, name) {
      var res;
      return regeneratorRuntime.async(function updateRowById$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                var query = "update names set name =? where id= ?";
                connection.query(query, [name, id], function (err, result) {
                  if (err) reject(new Error(err.message));
                  resolve(result.affectedRows);
                });
              }));

            case 3:
              res = _context3.sent;
              console.log(res);
              return _context3.abrupt("return", res === 1 ? true : false);

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              return _context3.abrupt("return", false);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }, {
    key: "getSearchedResult",
    value: function getSearchedResult(name) {
      var res;
      return regeneratorRuntime.async(function getSearchedResult$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                var query = "select * from names where name=?;";
                connection.query(query, [name], function (err, results) {
                  if (err) reject(new Error(err.message));
                  resolve(results);
                });
              }));

            case 3:
              res = _context4.sent;
              return _context4.abrupt("return", res);

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }, {
    key: "deleteRowById",
    value: function deleteRowById(id) {
      var res;
      return regeneratorRuntime.async(function deleteRowById$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = parseInt(id, 10);
              _context5.prev = 1;
              _context5.next = 4;
              return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                var query = "delete from names where id= ?";
                connection.query(query, [id], function (err, result) {
                  if (err) reject(new Error(err.message));
                  resolve(result.affectedRows);
                });
              }));

            case 4:
              res = _context5.sent;
              console.log(res);
              return _context5.abrupt("return", res === 1 ? true : false);

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](1);
              console.log(_context5.t0);
              return _context5.abrupt("return", false);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[1, 9]]);
    }
  }], [{
    key: "getDbServiceInstance",
    value: function getDbServiceInstance() {
      return instance ? instance : new DbService();
    }
  }]);

  return DbService;
}();

module.exports = DbService;