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
    var sql;
    if(req.body.table == "Student"){
        sql = "SELECT * FROM Student WHERE " + "id=\"" + req.body.username + "\" " + " AND " + "Password=\"" + req.body.password + "\" ";
    }      
    else{
        sql = "SELECT * FROM Advisor WHERE " + "id=\"" + req.body.username + "\" " + " AND " + "Password=\"" + req.body.password + "\" ";
    }
    console.log(sql);
    connection.query(sql , function(error, results, fields){
        console.log(results.length);
        if (error){
            var errormessage = {"Failure": "Username or password is incorrect"};
            res.json(errormessage);
        }
        else{
        //   var reminder = { "Success" : "True"};
            if(results.length > 0){
                var finalresult = { ok: true, text: results[0] };
                res.json(finalresult);
            }
            else{
                var finalresult = { ok: false, text: results[0]};
                res.json(finalresult);
            }
            
        }
    })
  
});

module.exports = router;
