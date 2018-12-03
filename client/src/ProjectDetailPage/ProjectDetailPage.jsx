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




class ProjectDetailPage extends Component {
  constructor(props){
    super(props);
    var currentproject = localStorage.project.split("\"")[3]
    // console.log();
    // console.log(localStorage.user.split("\"")[39]);
    // if(localStorage.user.split("\"")[39] === "Student")
    //     console.log("HERE is Student!");
    // else{
    //     const { from } = this.props.location.state || { from: { pathname: "/ProjectAdd" } };
    //     this.props.history.push(from);
    // }
    global.constants = [[],[]];
	var data = global.constants[0];
    this.state = {
        //current project
        scolumns: [{
            title:"ID  ",
            dataIndex: "id",
            key: "id",
            },
            {title: "First Name",
            dataIndex: "FirstName",
            key: "FirstName"},
            {title:"Last Name",
            dataIndex:"LastName",
            key:"LastName"},
            {title:"Degree",
            dataIndex:"Degree",
            key:"Degree"},
            {title:"GPA",
            dataIndex:"GPA",
            key:"GPA"},
            {title:"SchoolYear",
            dataIndex:"SchoolYear",
            key:"SchoolYear"},
            {title:"Advisor",
            dataIndex:"Advisor",
            key:"Advisor"},
            {title:"Action",
            dataIndex:"id",
            key:"id",
            render:(text,record,index)=>(<span>
                    {/* <Button id={text} type = "primary" onClick = {this.handleProjectApply}> Apply </Button> */}
                    {/* <Divider type = "vertical"/> */}
                    <Button id={text} type = "danger" onClick = {this.handleStudentDelete}> Delete </Button>
                    </span>
                    )}],

                    acolumns: [{
                        title:"ID  ",
                        dataIndex: "id",
                        key: "id",
                        },
                        {title: "First Name",
                        dataIndex: "FirstName",
                        key: "FirstName"},
                        {title:"Last Name",
                        dataIndex:"LastName",
                        key:"LastName"},
                        {title:"Action",
                        dataIndex:"id",
                        key:"id",
                        render:(text,record,index)=>(<span>
                                {/* <Button id={text} type = "primary" onClick = {this.handleProjectApply}> Apply </Button> */}
                                {/* <Divider type = "vertical"/> */}
                                <Button id={text} type = "danger" onClick = {this.handleAdvisorDelete}> Delete </Button>
                                </span>
                                )}],
            dataSource: data,
            currentSource: data,
            projectID: currentproject
    };
    var sdata = {
        Project_id: this.state.projectID
    }
    fetch(`/showProjectStudent`, {
        method: 'Post',
        body: JSON.stringify(sdata),
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'POST, GET',
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data=>{
            console.log(data);
            var jsontmp;	
		    var tmp = [];
			for(var i = 0; i < data.length; i ++){
				data[i]["key"] = 0;
				jsontmp = {

                    key :0,
					id: data[i].id,
					FirstName: data[i].FirstName,
					LastName: data[i].LastName,
					GPA: data[i].GPA,
					Advisor: data[i].Advisor,
					Degree: data[i].Degree,
					SchoolYear: data[i].SchoolYear
						
				}
				tmp.push(jsontmp);
			}
			console.log(tmp);
			this.setState({dataSource:tmp});
      })
    
    var adata = {
        Project_id: this.state.projectID
    }

    fetch(`/showProjectAdvisor`, {
        method: 'Post',
        body: JSON.stringify(adata),
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'POST, GET',
          "Content-Type": "application/json"
        }
      })
    .then(res => res.json())
      .then(data=>{
            console.log(data);
            var jsontmp;	
		    var tmp = [];
			for(var i = 0; i < data.length; i ++){
				data[i]["key"] = 0;
				jsontmp = {
                    key :0,
                    id: data[i].id,
                    FirstName: data[i].FirstName,
					LastName: data[i].LastName,
				}
				tmp.push(jsontmp);
			}
			console.log(tmp);
			this.setState({currentSource:tmp});
      })

    this.handleStudentDelete = this.handleStudentDelete.bind(this);
    this.handleAdvisorDelete = this.handleAdvisorDelete.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleStudentDelete(e){
    // var query = ""+ e.target.id + e.target.ProjectName;
    var id = e.target.id;
	for (var i = 0; i<this.state.dataSource.length;i++){
		if(this.state.dataSource[i].id === id) id = i;
    }
    console.log(localStorage.user.split("\"")[3]);
    var data = {
        id : this.state.dataSource[id].id,
        Project_id : this.state.projectID

    }
    fetch(`/deleteProjectStudent`, {
        method: 'Post',
        body: JSON.stringify(data),
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'POST, GET',
          "Content-Type": "application/json"
        }
      }).then(res => {
          //
        var sdata = {
            Project_id: this.state.projectID
        }
        fetch(`/showProjectStudent`, {
            method: 'Post',
            body: JSON.stringify(sdata),
            headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials':true,
            'Access-Control-Allow-Methods':'POST, GET',
            "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data=>{
                console.log(data);
                var jsontmp;	
                var tmp = [];
                for(var i = 0; i < data.length; i ++){
                    data[i]["key"] = 0;
                    jsontmp = {

                        key :0,
                        id: data[i].id,
                        FirstName: data[i].FirstName,
                        LastName: data[i].LastName,
                            
                    }
                    tmp.push(jsontmp);
                }
                console.log(tmp);
                this.setState({dataSource:tmp});
        })
        })
  }

  handleAdvisorDelete(e){
    var id = e.target.id;
	for (var i = 0; i<this.state.currentSource.length;i++){
		if(this.state.currentSource[i].id === id) id = i;
    }
    // console.log(localStorage.user.split("\"")[3]);
    var data = {
        id : this.state.currentSource[id].id,
        Project_id : this.state.projectID
    }
    console.log(data);
    fetch(`/deleteProjectAdvisor`, {
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
        Project_id: this.state.projectID
    }

    fetch(`/showProjectAdvisor`, {
        method: 'Post',
        body: JSON.stringify(adata),
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'POST, GET',
          "Content-Type": "application/json"
        }
      })
    .then(res => res.json())
      .then(data=>{
            console.log(data);
            var jsontmp;	
		    var tmp = [];
			for(var i = 0; i < data.length; i ++){
				data[i]["key"] = 0;
				jsontmp = {
                    key :0,
                    id: data[i].id,
                    FirstName: data[i].FirstName,
					LastName: data[i].LastName,
				}
				tmp.push(jsontmp);
			}
			console.log(tmp);
			this.setState({currentSource:tmp});
      })
        
      })

      
  }
  
  handleBack(e){
      const { from } = this.props.location.state || { from: { pathname: "/Project" } };
        this.props.history.push(from);
  }

  render() {
    return (
      <div className="App">
        <head>
            <link rel="stylesheet" href="https://bootswatch.com/4/lumen/bootstrap.css" media="screen"></link>
            {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link> */}
        </head>
       
        <NavComp></NavComp>
        
        
        
        {/* <div class="">
          <Table columns = {this.state.scolumns} dataSource = {this.state.sdataSource} />
        </div> */}
        Current Students
        
            <div class="container">
                <Table columns = {this.state.scolumns} dataSource = {this.state.dataSource} />
            </div> 
        Current Professors
            <div>
            <Table columns = {this.state.acolumns} dataSource = {this.state.currentSource} />
            </div>   
        <Button id="back" type = "default" onClick = {this.handleBack} > Back </Button>
            
        
        
        {/* <button onClick={this.demonstrate}>Demonstrate</button> */}
      </div>
    );
  }
}

export {ProjectDetailPage }; 
