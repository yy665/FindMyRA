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
  var sql = '';
  if(req.body.sf!= "" || req.body.sl!=""){
    sql = sql + '(SELECT Project_id, Project_Name, Sponsor, Active FROM project NATURAL JOIN (studentcontributor NATURAL JOIN student) WHERE ';
    if(req.body.sf!="")sql = sql + "FirstName=\"" + req.body.sf + "\" ";
    if(req.body.sl!="" && req.body.sf!="")sql = sql + " AND " + "LastName=\"" + req.body.sl + "\"";
    if(req.body.sl!="" && req.body.sf==="") sql = sql + "LastName=\"" + req.body.sl + "\"";

    if(req.body.name!="")sql = sql + " AND "+  "Project_Name=\"" + req.body.name + "\"";

    sql = sql +" )";


    //perform an intersect
    if(req.body.pf!= "" || req.body.pl!="")sql = "SELECT * FROM "+ sql + " d WHERE Project_Name IN ";
  }


  if(req.body.pf!= "" || req.body.pl!=""){
    if(req.body.sf!= "" || req.body.sl!="")sql = sql + '(SELECT Project_Name FROM project NATURAL JOIN (advisorcontributor NATURAL JOIN advisor) WHERE ';
    else sql = sql + '(SELECT Project_id, Project_Name, Sponsor, Active FROM project NATURAL JOIN (advisorcontributor NATURAL JOIN advisor) WHERE ';

    if(req.body.pf!="")sql = sql + "FirstName=\"" + req.body.pf + "\" ";
    if(req.body.pl!="" && req.body.pf!="")sql = sql + " AND " + "LastName=\"" + req.body.pl + "\"";
    if(req.body.pl!="" && req.body.pf==="") sql = sql + "LastName=\"" + req.body.pl + "\"";

    if(req.body.name!="")sql = sql + " AND " + "Project_Name=\"" + req.body.name + "\"";


    sql =sql+ ")";
  }

  if(req.body.sf === "" && req.body.sl ==="" && req.body.pf === "" && req.body.pl ===""){
    if(req.body.name==="")sql = "SELECT * FROM project";
    else sql = 'SELECT * FROM project WHERE Project_Name = \"' + req.body.name + '\"';
  }

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

module.exports = router;
