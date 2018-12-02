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
  var sql = "UPDATE Student SET "+ "Password=\"" + req.body.Password+"\",FirstName=\""+req.body.FirstName+ "\",LastName=\"" + req.body.LastName +"\",SeekingStatus ="+req.body.SeekingStatus+
      ",Degree =\""+req.body.Degree+ "\",GPA ="+req.body.GPA+ ",GroupPreference =\"" +req.body.GroupPreference + "\",Advisor=\"" + req.body.Advisor +"\" "
      + "WHERE id = \"" + req.body.id + "\"";
     
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
