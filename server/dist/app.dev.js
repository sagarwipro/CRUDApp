"use strict";

var express = require("express");

var app = express();

var cors = require("cors"); //For api calls


var dotenv = require("dotenv"); //We save our database info here like password,ID,PORT,etc.


dotenv.config(); //We can use .env file when we need to

var dbService = require("./dbService");

var _require = require("express"),
    response = _require.response;

app.use(cors()); //when we get incoming api call, it can block it and send data to our backend.

app.use(express.json()); //That it can send data into Json format.

app.use(express.urlencoded({
  extended: false
}));
var port = process.env.PORT;
var hostname = process.env.HOST; //We will use CRUD here.
//CREATE

app.post('/insert', function (request, response) {
  var name = request.body.name;
  var db = dbService.getDbServiceInstance();
  console.log("Inserting the data");
  var result = db.insertNewName(name);
  result.then(function (data) {
    return response.json({
      data: data
    });
  })["catch"](function (err) {
    return console.log(err);
  });
}); //READ

app.get('/getAll', function (req, res) {
  var db = dbService.getDbServiceInstance();
  console.log("GetAll Function called."); //res.sendFile('index.html',{root:'wamp64/www/fullstackApp/client/'});

  var result = db.getAllData();
  result.then(function (data) {
    return res.json({
      data: data
    });
  })["catch"](function (err) {
    return console.log(err);
  });
});
app.get('/search/:name', function (req, res) {
  var name = req.params.name;
  var db = dbService.getDbServiceInstance();
  console.log("search Function called.");
  var result = db.getSearchedResult(name);
  result.then(function (data) {
    return res.json({
      data: data
    });
  })["catch"](function (err) {
    return console.log(err);
  });
}); //UPDATE

app.patch('/update', function (req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var db = dbService.getDbServiceInstance();
  console.log("Update Function called from app.js");
  var result = db.updateRowById(id, name);
  result.then(function (data) {
    return res.json({
      success: data
    });
  })["catch"](function (err) {
    return console.log(err);
  });
}); //DELETE

app["delete"]('/delete/:id', function (req, res) {
  var id = req.params.id;
  var db = dbService.getDbServiceInstance();
  console.log("delete Function called from app.js and parameters are " + req.params.id);
  var result = db.deleteRowById(id);
  console.log(result);
  result.then(function (result) {
    console.log("Returning value from dbServices is " + result);
  });
  result.then(function (data) {
    return res.json({
      success: data
    });
  })["catch"](function (err) {
    return console.log(err);
  });
}); //PortListner 

app.listen(process.env.PORT, process.env.HOST, function () {
  console.log("App is running");
});