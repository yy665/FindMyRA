var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test'
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  connection.connect();
  connection.query('SELECT * FROM Student', function(error, results, fields){
    if (error) throw error;
    else{
      res.json(results);
    }
  })
  
});

module.exports = router;
