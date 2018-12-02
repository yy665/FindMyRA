var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'lechang3_root1',
  password: 'qwertyuiopas',
  database: 'lechang3_test'
})

connection.connect();


/* GET users listing. */
router.post('/', function(req, res, next) {
  var sql = 'INSERT INTO Project VALUES(\"' + req.body.Project_id + "\", \"" + req.body.Project_Name + "\", \"" + req.body.Sponsor + "\", \"" + req.body.Active + "\")";
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
