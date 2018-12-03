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
  // res.send('respond with a resource');
  var sql
  switch(req.body.table){
    case 'Advisor':
      sql = "DELETE FROM Advisor" + " WHERE id = " + req.body.id;
      break;
    case 'Student':
      sql = "DELETE FROM Student" + " WHERE id = " + req.body.id;
      break;
  }

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
