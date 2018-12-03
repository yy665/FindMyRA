var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'lechang3_root',
  password: 'password',
  database: 'lechang3_test',
  multipleStatements: true
})

connection.connect();

/* GET users listing. */
router.post('/', function(req, res, next) {
  var sql = 'INSERT INTO AdvisorContributor VALUES(\"' + req.body.id + "\", \"" + req.body.Project_id + "\"); "+'INSERT INTO Contributor VALUES(\"' + req.body.id + "\", \"" + req.body.Project_id + "\");";
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
