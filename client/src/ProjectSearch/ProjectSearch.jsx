import React, { Component } from 'react';
// import {Route, Link} from 'react-router-dom'
import {  Route, Link } from 'react-router-dom';
// import PeopleComp from '../components/PeopleComp/PeopleComp.js';
// import UpdateComp from '../components/PeopleComp/UpdateComp.js';
import Home from '../components/Home.js';
import NavComp from '../components/NavComp/NavComp';
import Button from 'antd/lib/button';
import {Table, Divider} from 'antd';
import 'antd/dist/antd.css';




class ProjectSearch extends Component {
  constructor(props){
    super(props);
    // console.log(localStorage.user.split("\""));
    // console.log(localStorage.user.split("\"")[39]);
    if(localStorage.user.split("\"")[39] === "Student")
        console.log("HERE is Student!");
    else{
        const { from } = this.props.location.state || { from: { pathname: "/ProjectAdd" } };
        this.props.history.push(from);
    }
    global.constants = [[],[]];
	var data = global.constants[0];
    this.state = {
        //current project
        scolumns: [{
            title:"ID  ",
            dataIndex: "id",
            key: "id",
            },
            {title: "Project Name",
            dataIndex: "ProjectName",
            key: "ProjectName"},
            {title:"Sponsor",
            dataIndex:"Sponsor",
            key:"Sponsor"},
            {title:"Active",
            dataIndex:"Active",
            key:"Active"},
            {title:"Action",
            dataIndex:"id",
            key:"id",
            render:(text,record,index)=>(<span>
                    <Button id={text} type = "primary" onClick = {this.handlecurrentProjectDetails}>Details </Button>   
                    <Button id={text} type = "danger" onClick = {this.handleProjectApply}> Apply </Button>
                    {/* <Divider type = "vertical"/> */}
                    
                    </span>
                    )}],

                    acolumns: [{
                        title:"ID  ",
                        dataIndex: "id",
                        key: "id",
                        },
                        {title: "Project Name",
                        dataIndex: "ProjectName",
                        key: "ProjectName"},
                        {title:"Sponsor",
                        dataIndex:"Sponsor",
                        key:"Sponsor"},
                        {title:"Active",
                        dataIndex:"Active",
                        key:"Active"},
                        {title:"Action",
                        dataIndex:"id",
                        key:"id",
                        render:(text,record,index)=>(<span>
                                <Button id={text} type = "primary" onClick = {this.handleenrolledProjectDetails}> Details </Button>
                                {/* <Divider type = "vertical"/> */}
                                <Button id={text} type = "danger" onClick = {this.handleProjectDelete}> Delete </Button>
                                </span>
                                )}],
            dataSource: data,
            currentSource: data
    };
    var sdata = {
        table: "Project"
    }
    fetch(`/demonstrate`, {
        method: 'Post',
        body: JSON.stringify(sdata),
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'POST, GET',
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      .then(data=>{
            console.log(data);
            var jsontmp;	
		    var tmp = [];
			for(var i = 0; i < data.length; i ++){
				data[i]["key"] = 0;
				jsontmp = {

                    key :0,
						id: data[i].Project_id,
						ProjectName: data[i].Project_Name,
						Sponsor: data[i].Sponsor,
						Active: data[i].Active
						
				}
				tmp.push(jsontmp);
			}
			console.log(tmp);
			this.setState({dataSource:tmp});
      })
    
    var adata = {
        table: "StudentContributor"
    }

    fetch(`/demonstrate`, {
        method: 'Post',
        body: JSON.stringify(adata),
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'POST, GET',
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      .then(data=>{
            console.log(data);
            var jsontmp;	
		    var tmp = [];
			for(var i = 0; i < data.length; i ++){
				data[i]["key"] = 0;
				jsontmp = {
                    key :0,
                    id: data[i].Project_id,
				}
				tmp.push(jsontmp);
			}
			console.log(tmp);
			this.setState({currentSource:tmp});
      })

    this.handleProjectApply = this.handleProjectApply.bind(this);
    this.handleProjectDelete = this.handleProjectDelete.bind(this);
    this.handlecurrentProjectDetails = this.handlecurrentProjectDetails.bind(this);
    this.handleenrolledProjectDetails = this.handleenrolledProjectDetails.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(e){
    if(e.target.id === "search"){
      var result = document.getElementById('result');
      result.style.visibility = "visible";
    }

  }

  handleProjectApply(e){
    // var query = ""+ e.target.id + e.target.ProjectName;
    var id = e.target.id;
	for (var i = 0; i<this.state.dataSource.length;i++){
		if(this.state.dataSource[i].id === id) id = i;
    }
    console.log(localStorage.user.split("\"")[3]);
    var data = {
        id : localStorage.user.split("\"")[3],
        Project_id: this.state.dataSource[id].id
    }
    fetch(`/studentApply`, {
        method: 'Post',
        body: JSON.stringify(data),
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'POST, GET',
          "Content-Type": "application/json"
        }
      }).then(res => {
          console.log(res)
          var adata = {
            table: "StudentContributor"
        }
    
          fetch(`/demonstrate`, {
            method: 'Post',
            body: JSON.stringify(adata),
            headers:{
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials':true,
              'Access-Control-Allow-Methods':'POST, GET',
              "Content-Type": "application/json"
            }
          }).then(res => res.json())
          .then(data=>{
                console.log(data);
                var jsontmp;	
                var tmp = [];
                for(var i = 0; i < data.length; i ++){
                    data[i]["key"] = 0;
                    jsontmp = {
                        key :0,
                        id: data[i].Project_id,
                    }
                    tmp.push(jsontmp);
                }
                console.log(tmp);
                this.setState({currentSource:tmp});
          })
      })
  }

  handleProjectDelete(e){
    var id = e.target.id;
	for (var i = 0; i<this.state.currentSource.length;i++){
		if(this.state.currentSource[i].id === id) id = i;
    }
    console.log(localStorage.user.split("\"")[3]);
    var data = {
        id : localStorage.user.split("\"")[3],
        Project_id: this.state.currentSource[id].id
    }
    console.log(data);
    fetch(`/studentApplyDel`, {
        method: 'Post',
        body: JSON.stringify(data),
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'POST, GET',
          "Content-Type": "application/json"
        }
      }).then(res => {
        var adata = {
            table: "StudentContributor"
        }
    
          fetch(`/demonstrate`, {
            method: 'Post',
            body: JSON.stringify(adata),
            headers:{
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials':true,
              'Access-Control-Allow-Methods':'POST, GET',
              "Content-Type": "application/json"
            }
          }).then(res => res.json())
          .then(data=>{
                console.log(data);
                var jsontmp;	
                var tmp = [];
                for(var i = 0; i < data.length; i ++){
                    data[i]["key"] = 0;
                    jsontmp = {
                        key :0,
                        id: data[i].Project_id,
                    }
                    tmp.push(jsontmp);
                }
                console.log(tmp);
                this.setState({currentSource:tmp});
          })
      })

      
  }

  handlecurrentProjectDetails(e){
    var id = e.target.id;
	for (var i = 0; i<this.state.dataSource.length;i++){
		if(this.state.dataSource[i].id === id) id = i;
    }
    console.log(this.state.dataSource[id]);
    var project = {
        id: this.state.dataSource[id].id
    }
    localStorage.setItem('project', JSON.stringify(project));
    const { from } = this.props.location.state || { from: { pathname: "/ProjectDetailRestrict" } };
    this.props.history.push(from);
  }

  handleenrolledProjectDetails(e){
    var id = e.target.id;
	for (var i = 0; i<this.state.currentSource.length;i++){
		if(this.state.currentSource[i].id === id) id = i;
    }
    console.log(this.state.currentSource[id]);
    var project = {
        id: this.state.currentSource[id].id
    }
    localStorage.setItem('project', JSON.stringify(project));
    const { from } = this.props.location.state || { from: { pathname: "/ProjectDetailRestrict" } };
    this.props.history.push(from);
  }


  render() {
    return (
      <div>
        <head>
            <link rel="stylesheet" href="https://bootswatch.com/4/lumen/bootstrap.css" media="screen"></link>
            {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link> */}
        </head>
       
        <NavComp></NavComp>

        Please fill in any of the filters.<br />
        <br/>
        <div class="form-group row">
          <div class = "col-md-4 mb-3">
            <label for="projectQuery">Project Name</label>
            <input type="text" class="form-control" id="name" placeholder="Project1" onChange = {this.handleQuery}></input>
          </div>
        </div>






        <div class="form-group row">
          <div class = "col-md-4 mb-3">
          <label for="professorQuery">Professor First Name</label>
            <input type="text" class="form-control" id="pFirstName" placeholder="Abdu" onChange = {this.handleQuery}></input>
          </div>
        
        
          <div class = "col-md-4 mb-3">
          <label for="professorQuery">Professor Last Name</label>
          <input type="text" class="form-control" id="pLastName" placeholder="Alawani" onChange = {this.handleQuery}></input>
          </div>
        </div>


        <div class="form-group row">
           <div class = "col-md-4 mb-3">
          <label for="studentQuery">Student First Name</label>
          <input type="text" class="form-control" id="sFirstName" placeholder="Dong" onChange = {this.handleQuery}></input>
          </div>
        

           <div class = "col-md-4 mb-3">
          <label for="studentQuery">Student Last Name</label>
            <input type="text" class="form-control" id="sLastName" placeholder="Liu" onChange = {this.handleQuery}></input>
          </div>
        </div>


        <div>
        <Button id="search" type = "primary" onClick = {this.handleQuery}> Search </Button>
        </div>


        
            <div class="container" id = "result" style = {{visibility: "hidden"}} >
                <Table columns = {this.state.scolumns} dataSource = {this.state.dataSource} />
            </div> 
        

            
        
        
        {/* <button onClick={this.demonstrate}>Demonstrate</button> */}
      </div>
    );
  }
}

export {ProjectSearch }; 
