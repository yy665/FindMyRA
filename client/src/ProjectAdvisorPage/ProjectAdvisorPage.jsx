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
import Select from 'react-select';




class ProjectAdvisorPage extends Component {
  constructor(props){
    super(props);
    console.log(localStorage.user.split("\""));
    console.log(localStorage.user.split("\"")[3]);
    // if(localStorage.user.split("\"")[39] === "Student")
    //     console.log("HERE is Student!");
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
                    <Button id={text} type = "primary" onClick = {this.handleProjectApply}> Apply </Button>
                    {/* <Divider type = "vertical"/> */}
                    {/* <Button id={text} type = "danger" onClick = {this.sHandleDelete}> Delete </Button> */}
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
                                <Button id={text} type = "primary" onClick = {this.handleProjectDetails}> Details </Button>
                                {/* <Divider type = "vertical"/> */}
                                <Button id={text} type = "danger" onClick = {this.handleProjectDelete}> Delete </Button>
                                </span>
                                )}],
            dataSource: data,
            currentSource: data,
            selectOptions : [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' }
              ],
            selectedOption: null,
            ProjectName: null,
            Sponsor:null,
            Active:0


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
        table: "AdvisorContributor",
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
				}
				tmp.push(jsontmp);
			}
			console.log(tmp);
			this.setState({currentSource:tmp});
      })

    this.handleProjectApply = this.handleProjectApply.bind(this);
    this.handleProjectDelete = this.handleProjectDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleAddProject = this.handleAddProject.bind(this);
    this.handleProjectDetails = this.handleProjectDetails.bind(this);
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
    fetch(`/advisorApply`, {
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
            table: "AdvisorContributor",
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
    fetch(`/advisorApplyDel`, {
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
            table: "AdvisorContributor",
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
                    }
                    tmp.push(jsontmp);
                }
                console.log(tmp);
                this.setState({currentSource:tmp});
          })
      })

      
  }

  handleAdd(e){
    var Layer1 = document.getElementById('Add');
    Layer1.style.visibility = "visible";
  }

  handleChange(e){
    console.log(e.target.name);
    if(e.target.name === "ProjectName")this.setState({ProjectName:e.target.value});
    else if(e.target.name === "Sponsor")this.setState({Sponsor:e.target.value});
    else if(e.target.name === "Active"){
        var obj = document.getElementById(e.target.id);
        var index = obj.selectedIndex;
        var val = obj.options[index].value;
        if(val === "Yes")this.setState({Active: 1});
        else this.setState({Active:0});
    }
    // else if(e.target.name === "Area"){
    //     this.setState({ selectedOption:e.target.value });
    // }
  }

  handleSelectChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  handleAddProject(e){
        console.log(this.state);
        var data = {
            Project_id : localStorage.user.split("\"")[3]+" " + this.state.ProjectName,
            Project_Name: this.state.ProjectName,
            Sponsor:this.state.Sponsor,
            Active:this.state.Active
        }

        fetch(`/addProject`, {
            method: 'Post',
            body: JSON.stringify(data),
            headers:{
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials':true,
              'Access-Control-Allow-Methods':'POST, GET',
              "Content-Type": "application/json"
            }
        })
        .then(
            res=>{
                console.log(res);
                // const { from } = this.props.location.state || { from: { pathname: "/ProjectAdd" } };
                // this.props.history.push(from);
                var data = {
                    id : localStorage.user.split("\"")[3],
                    Project_id:  localStorage.user.split("\"")[3]+" " + this.state.ProjectName
                }
                fetch(`/advisorApply`, {
                    method: 'Post',
                    body: JSON.stringify(data),
                    headers:{
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Credentials':true,
                      'Access-Control-Allow-Methods':'POST, GET',
                      "Content-Type": "application/json"
                    }
                  })
                  .then(
                      res=>{
                        console.log(res);
                        const { from } = this.props.location.state || { from: { pathname: "/Project" } };
                        this.props.history.push(from);
                      }
                  )
            }
        )
  }

  handleProjectDetails(e){
    var id = e.target.id;
	for (var i = 0; i<this.state.currentSource.length;i++){
		if(this.state.currentSource[i].id === id) id = i;
    }
    console.log(this.state.currentSource[id]);
    var project = {
        id: this.state.currentSource[id].id
    }
    localStorage.setItem('project', JSON.stringify(project));
    const { from } = this.props.location.state || { from: { pathname: "/ProjectDetail" } };
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
            <Button onClick = {this.handleAdd}>Add New Project</Button>
            </div>  

            {/* ADD part  */}
            <div id = "Add" style = {{top: "100px", visibility: "hidden"}}>
                <div>
                ProjectName<text style={{color:"red"}}>(*required):
                    <input type="text" class="form-control" name="ProjectName" onChange={this.handleChange} defaultValue=""></input> </text>
                    
                    Sponsor(<text style={{color:"red"}}>*required):
                    <input type="text" class="form-control" name="Sponsor" defaultValue="" onChange={this.handleChange}></input> </text>
                </div>
    
                <div>
                    Are you seeking for students now?
                <select class="custom-select" name = "Active" id = "Active" onChange={this.handleChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                </div>

                <div>
                    Realated Area:
                    <Select
                        name = "Area"
                        value={this.state.selectedOption}
                        onChange={this.handleSelectChange}
                        options={this.state.selectOptions}
                    />
                     <Button type = "primary" onClick = {this.handleAddProject}> Click to Add! </Button>
                </div>
            </div>
        
        
        {/* <button onClick={this.demonstrate}>Demonstrate</button> */}
      </div>
    );
  }
}

export {ProjectAdvisorPage }; 
