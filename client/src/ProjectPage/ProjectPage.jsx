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




class ProjectPage extends Component {
  constructor(props){
    super(props);
    // console.log(localStorage.user.split("\"")[3]);
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
                    <Button id={text} type = "default" onClick = {this.handlecurrentProjectDetails}>Details </Button>
                    {/* <Divider type = "vertical"/> */}
                    <Button id={text} type = "primary" onClick = {this.handleProjectApply}> Apply </Button>
                    
                    
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
                                <Button id={text} type = "default" onClick = {this.handleenrolledProjectDetails}> Details </Button>
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
        table: "StudentContributor NATURAL JOIN Project",
        id: localStorage.user.split("\"")[3]
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
                    ProjectName: data[i].Project_Name,
						Sponsor: data[i].Sponsor,
						Active: data[i].Active
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
            table: "StudentContributor NATURAL JOIN Project",
            id: localStorage.user.split("\"")[3]
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
                        ProjectName: data[i].Project_Name,
						Sponsor: data[i].Sponsor,
						Active: data[i].Active
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
            table: "StudentContributor NATURAL JOIN Project",
            id: localStorage.user.split("\"")[3]
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
                        ProjectName: data[i].Project_Name,
						Sponsor: data[i].Sponsor,
						Active: data[i].Active
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
      <div className="App">
        <head>
            <link rel="stylesheet" href="https://bootswatch.com/4/lumen/bootstrap.css" media="screen"></link>
            {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link> */}
        </head>

        <NavComp></NavComp>



        {/* <div class="">
          <Table columns = {this.state.scolumns} dataSource = {this.state.sdataSource} />
        </div> */}
        current offered projects

            <div class="container">
                <Table columns = {this.state.scolumns} dataSource = {this.state.dataSource} />
            </div>
        current enrolled projects
            <div>
            <Table columns = {this.state.acolumns} dataSource = {this.state.currentSource} />
            </div>

        {/* <button onClick={this.demonstrate}>Demonstrate</button> */}
      </div>
    );
  }
}

export {ProjectPage };
