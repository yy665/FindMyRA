var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'lechang3_root',
  password: 'password',
  database: 'lechang3_test'
})

connection.connect();
  connection.query('SELECT * FROM Students', function(error, results, fields){
    if (error) throw error;
    console.log(results)
  })
  