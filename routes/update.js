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
  // res.send('respond with a resource');
  var sql
  switch(req.body.table){
    case 'Advisor':
      sql = "UPDATE Advisor SET "+"FirstName=\""+req.body.firstname+ "\",LastName=\"" + req.body.lastname +"\",SeekingStatus ="+req.body.seeking+
      ",Title =\""+req.body.title+ "\" "
      + "WHERE id = " + req.body.id;
      break;
    case 'Student':
      sql = "UPDATE Student SET "+"FirstName=\""+req.body.firstname+ "\",LastName=\"" + req.body.lastname +"\",SeekingStatus ="+req.body.seeking+
      ",Degree =\""+req.body.degree+ "\",GPA ="+req.body.gpa+ ",GroupPreference =\"" +req.body.group + "\",Advisor=\"" + req.body.advisor +"\" "
      + "WHERE id = " + req.body.id;
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

connection.end();

module.exports = router;
