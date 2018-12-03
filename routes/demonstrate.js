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
  var sql = 'SELECT * FROM ' + req.body.table;
  if(req.body.table === "StudentContributor NATURAL JOIN Project" || req.body.table === "AdvisorContributor NATURAL JOIN Project"||req.body.table==="StudentContributor"||req.body.table==="AdvisorContributor")
    sql = sql + ' WHERE id=\"' + req.body.id + "\"";
  else if(req.body.table === "Project")
    sql = sql + ' WHERE Active=1';
  
  console.log(sql);
  connection.query(sql, function(error, results, fields){
    if (error) throw error;
    else{
      res.json(results);
    }
  })
  

});


module.exports = router;
