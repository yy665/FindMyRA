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
router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
  var sql = req.body.SQL;
  // var sql = 'INSERT INTO Advisor VALUES ("1234567890","dong","liu",1,null);'
  console.log(req.body);
  connection.connect();
  connection.query(sql , function(error, results, fields){
    if (error){
      console.log(error);
    }
    else{
      var reminder = { "Success" : "True"};
      res.json(reminder);
    }
  })
  
});

module.exports = router;
