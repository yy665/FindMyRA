var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'lechang3_root2',
  password: 'qwertyuiopas',
  database: 'lechang3_test'
})

connection.connect();

/* GET users listing. */
router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
  var sql = "UPDATE Advisor SET "+ "Password=\"" + req.body.Password+"\",FirstName=\""+req.body.FirstName+ "\",LastName=\"" + req.body.LastName +"\",SeekingStatus ="+req.body.SeekingStatus+
       ",Title=\""+req.body.Title +"\" WHERE id = \"" + req.body.id + "\"";
     
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
