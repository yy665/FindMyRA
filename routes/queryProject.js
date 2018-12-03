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
  var sql = '';
  if(req.body.sf!= "" || req.body.sl!=""){
    sql = sql + '(SELECT Project_id, Project_Name, Sponsor, Active FROM (Project NATURAL JOIN ProjectRelatedArea) NATURAL JOIN (StudentContributor NATURAL JOIN Student) WHERE ';
    if(req.body.sf!="")sql = sql + "FirstName=\"" + req.body.sf + "\" ";
    if(req.body.sl!="" && req.body.sf!="")sql = sql + " AND " + "LastName=\"" + req.body.sl + "\"";
    if(req.body.sl!="" && req.body.sf==="") sql = sql + "LastName=\"" + req.body.sl + "\"";

    if(req.body.name!="")sql = sql + " AND "+  "Project_Name=\"" + req.body.name + "\"";
    if(req.body.area!="")sql = sql + " AND "+  "Area_id=\"" + req.body.area + "\"";

    sql = sql +" )";


    //perform an intersect
    if(req.body.pf!= "" || req.body.pl!="")sql = "SELECT * FROM "+ sql + " d WHERE Project_Name IN ";
  }


  if(req.body.pf!= "" || req.body.pl!=""){
    if(req.body.sf!= "" || req.body.sl!="")sql = sql + '(SELECT Project_Name FROM (Project NATURAL JOIN ProjectRelatedArea) NATURAL JOIN (AdvisorContributor NATURAL JOIN Advisor) WHERE ';
    else sql = sql + '(SELECT Project_id, Project_Name, Sponsor, Active FROM (Project NATURAL JOIN ProjectRelatedArea) NATURAL JOIN (AdvisorContributor NATURAL JOIN Advisor) WHERE ';

    if(req.body.pf!="")sql = sql + "FirstName=\"" + req.body.pf + "\" ";
    if(req.body.pl!="" && req.body.pf!="")sql = sql + " AND " + "LastName=\"" + req.body.pl + "\"";
    if(req.body.pl!="" && req.body.pf==="") sql = sql + "LastName=\"" + req.body.pl + "\"";

    if(req.body.name!="")sql = sql + " AND " + "Project_Name=\"" + req.body.name + "\"";
    if(req.body.area!="")sql = sql + " AND "+  "Area_id=\"" + req.body.area + "\"";


    sql =sql+ ")";
  }

  if(req.body.sf === "" && req.body.sl ==="" && req.body.pf === "" && req.body.pl ===""){
      sql = "SELECT * FROM Project";
    if(req.body.name!="" && req.body.area!="")sql = 'SELECT Project_id, Project_Name, Sponsor, Active FROM (Project NATURAL JOIN ProjectRelatedArea) WHERE Project_Name = \"' + req.body.name + '\"' + " AND "+  "Area_id=\"" + req.body.area + "\"";
    else if(req.body.area!="")sql = 'SELECT Project_id, Project_Name, Sponsor, Active FROM (Project NATURAL JOIN ProjectRelatedArea) WHERE Area_id=\"' + req.body.area + "\"";
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
