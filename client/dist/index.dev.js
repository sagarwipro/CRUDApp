"use strict";

GLOBAL.document = new JSDOM(html).window.document;

var jsdom = require("jsdom");

var JSDOM = jsdom.JSDOM;
document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:3000/getAll').then(function (res) {
    return res.json();
  }).then(function (data) {
    return loadHTMLTable(data['data']);
  });
});

function loadHTMLTable(data) {
  var table = document.querySelector('table tbody');
  console.log(data);

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    return;
  }

  tableHtml = "";
  data.forEach(function (_ref) {
    var id = _ref.id,
        name = _ref.name,
        date_added = _ref.date_added;
    console.log(id);
    tableHtml += "<tr><td>".concat(id, "</td><td>").concat(name, "</td><td>").concat(new Date(date_added).toLocaleString(), "</td>");
    tableHtml += "<td><button class=\"delete-row-btn\" data-id=".concat(id, ">Delete</td>");
    tableHtml += "<td><button class=\"edit-row-btn\" data-id=".concat(id, ">Edit</td>");
  });
  table.innerHTML = tableHtml;
}

document.querySelector('table tbody').addEventListener('click', function (event) {
  console.log(event.target);
  console.log(event.target.dataset.id);

  if (event.target.className === "delete-row-btn") {
    //        console.log(event.target.dataset);
    deleteRowById(event.target.dataset.id);
  }

  if (event.target.className === "edit-row-btn") {
    showUp(event.target.dataset.id);
  }
});
document.querySelector('#update-row-btn').addEventListener('click', function (event) {
  var Id = document.querySelector('#update-id-input').value;
  var Name = document.querySelector('#update-name-input').value;
  console.log("index.js: " + Id + " " + Name);
  fetch('http://localhost:3000/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: Id,
      name: Name
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.success) {
      location.reload();
    }
  });
});
document.querySelector('#search-btn').addEventListener('click', function (event) {
  var name = document.querySelector('#search-input').value;
  console.log("index.js: " + name);
  fetch('http://localhost:3000/search/' + name).then(function (res) {
    return res.json();
  }).then(function (data) {
    return loadHTMLTable(data['data']);
  });
});

function deleteRowById(id) {
  fetch('http://localhost:3000/delete/' + id, {
    method: 'DELETE'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.success) {
      location.reload();
    }
  });
}

function showUp(id) {
  var updateSection = document.querySelector('#update-row');
  updateSection.style.display = "inline-block";
  var ID = document.querySelector('#update-id-input');
  ID.value = id;
}

var addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function () {
  var nameInput = document.querySelector('#name-input');
  var name = nameInput.value;
  nameInput.value = "";
  location.reload();
  fetch('http://localhost:3000/insert', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      name: name
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return insertRowDataTable(data['data']);
  });
};

function insertRowDataTable(data) {
  console.log(data);
  var table = document.querySelector('table tbody');
  var isTableData = table.querySelector('.no-data');
  var tableHtml = "<tr>";

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === 'dateAdded') {
        data[key] = new Date(data[key]).toLocaleString();
      }

      console.log(data.id + " " + data.name + " " + data.dateAdded);
      tableHtml += "<td>".concat(data[key], "</td>");
    }
  }

  tableHtml += "<td><button class=\"delete-row-btn\" data-id=".concat(data.id, ">Delete</td>");
  tableHtml += "<td><button class=\"edit-row-btn\" data-id=".concat(data.id, ">Edit</td>");
  tableHtml += "</tr>";

  if (isTableData) {
    table.innerHTML = tableHtml;
  } else {
    var newRow = table.insertRow();
    newRow.innerHTML = tableHtml;
  }
}