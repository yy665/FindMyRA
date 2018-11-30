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
  var sql = 'SELECT * FROM Student NATURAL JOIN (SELECT * FROM StudentContributor WHERE Project_id = \"' + req.body.Project_id + '\") R';
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

module.exports = router;


