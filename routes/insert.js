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
  // var sql = 'INSERT INTO Advisor VALUES ("1234567890","dong","liu",1,null);'
  var sql
  switch(req.body.table){
    case 'Advisor':
      sql = "INSERT INTO " + req.body.table + " VALUES" + "(\"" + req.body.id +"\",\""+ req.body.firstname + "\",\""+ req.body.lastname 
      + "\","+ req.body.seeking + ",\""+ req.body.title +"\")" ;
      break;
    case 'Student':
      sql = "INSERT INTO " + req.body.table + " VALUES" + "(\"" + req.body.id +"\",\""+ req.body.firstname + "\",\""+ req.body.lastname 
        + "\","+ req.body.seeking + ",\""+ req.body.degree + "\",\""+ req.body.year + "\","+ req.body.gpa + ",\""+  req.body.group 
        + "\",\""+req.body.advisor +"\")" ;
      break;
  }
  
  
  console.log(sql);
  connection.query(sql , function(error, results, fields){
    if (error){
      var errormessage = {"Failure": "True"};
      res.json(errormessage);
      // console.log(error);
    }
    else{
      var reminder = { "Success" : "True"};
      res.json(reminder);
    }
  })
  
});

module.exports = router;
