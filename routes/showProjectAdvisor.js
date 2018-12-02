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

/* GET users listing. */
router.post('/', function(req, res, next) {
  var sql = 'SELECT * FROM Advisor NATURAL JOIN (SELECT * FROM AdvisorContributor WHERE Project_id = \"' + req.body.Project_id + '\") R';
  console.log(sql);
  connection.query(sql, function(error, results, fields){
    if (error){
        console.log(error);
    }
    else{
      res.json(results);
    }
  })
  
});
connection.end();
module.exports = router;


