var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test'
})

connection.connect();
  connection.query('SELECT * FROM Students', function(error, results, fields){
    if (error) throw error;
    console.log(results)
  })