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
  // var sql = 'INSERT INTO Advisor VALUES ("1234567890","dong","liu",1,null);'
  var sql = "SELECT * FROM Student WHERE id= \"" + req.body.id +"\"" ;
  
  console.log(sql);
  connection.query(sql , function(error, results, fields){
    if (error){
      var errormessage = {"Failure": "True"};
      res.json(errormessage);
      // console.log(error);
    }
    else{
    //   var reminder = { "Success" : "True"};
      console.log(results);
      res.json(results);
    }
  })
  
});

module.exports = router;
