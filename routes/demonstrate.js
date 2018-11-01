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

/* GET users listing. */
router.post('/', function(req, res, next) {
  var sql = 'SELECT * FROM ' + req.body.table;
  connection.query(sql, function(error, results, fields){
    if (error) throw error;
    else{
      res.json(results);
    }
  })
  
});

module.exports = router;
