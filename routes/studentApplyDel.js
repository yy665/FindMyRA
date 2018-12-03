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
  // res.send('respond with a resource');
  var sql
  sql = "DELETE FROM StudentContributor" + " WHERE id = \"" + req.body.id + "\" AND Project_id = \"" + req.body.Project_id+"\";"+"DELETE FROM Contributor" + " WHERE Researcher_id = \"" + req.body.id + "\" AND Project_id = \"" + req.body.Project_id+"\";";

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
