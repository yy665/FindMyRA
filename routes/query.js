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
  // var sql = 'INSERT INTO Advisor VALUES ("1234567890","dong","liu",1,null);'
  var sql;
  switch(req.body.table){
    case 'Advisor':
        sql = "SELECT * FROM Advisor WHERE ";
        // if((req.body.id == null)&&(req.body.firstname = null) && (req.body.lastname != null)){
        //     sql = "SELECT * FROM Advisor";
        //     break;
        // }

        if(req.body.id != null && req.body.id.length> 0 ) sql = sql + "id=" + req.body.id;
        if(req.body.firstname != null  && req.body.firstname.length > 0){
            if(req.body.id != null && req.body.id.length > 0 ){
                sql = sql + " AND "
            }  
            sql = sql + "FirstName=\"" + req.body.firstname + "\" ";
        } 
        if(req.body.lastname != null && req.body.lastname.length > 0){
            if((req.body.id != null &&  req.body.id.length> 0)|| (req.body.firstname != null && req.body.firstname.length > 0 )){
                sql = sql + " AND "
            }
            sql = sql + "LastName=\"" + req.body.lastname + "\"";
        } 
        break;

    case 'Student':
        sql = "SELECT * FROM Student WHERE " ;
        // if((req.body.id == null)&&(req.body.firstname = null) && (req.body.lastname != null)){
        //     sql = "SELECT * FROM Student";
        //     break;
        // }
        if(req.body.id != null && req.body.id.length> 0 ) sql = sql + "id=" + req.body.id;
        if(req.body.firstname != null  && req.body.firstname.length > 0){
            if(req.body.id != null && req.body.id.length > 0 ){
                sql = sql + " AND "
            }  
            sql = sql + "FirstName=\"" + req.body.firstname + "\" ";
        } 
        if(req.body.lastname != null && req.body.lastname.length > 0){
            if((req.body.id != null &&  req.body.id.length> 0)|| (req.body.firstname != null && req.body.firstname.length > 0 )){
                sql = sql + " AND "
            }
            sql = sql + "LastName=\"" + req.body.lastname + "\"";
        } 
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
    //   var reminder = { "Success" : "True"};
      console.log(results);
      res.json(results);
    }
  })
});

connection.end();

module.exports = router;
