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
    global.constants = [[1],[]];
	var data = global.constants[0];
    this.state = {
        //current project
        scolumns: [{
            title:"ID",
            dataIndex: "id",
            key: "id",
            },
            {title: "First Name",
            dataIndex: "FirstName",
            key: "FirstName"},
            {title:"Last Name",
            dataIndex:"LastName",
            key: "LastName"},
            {title:"Pursuing Degree",
            dataIndex:"Degree",
            key:"Degree"},
            {title:"School Year",
            dataIndex:"SchoolYear",
            key:"SchoolYear"},
            {title:"GPA",
            dataIndex:"GPA",
            key:"GPA"},
            {title:"Seeking Group",
            dataIndex:"SeekingStatus",
            key:"SeekingStatus",
            render:status=>(status===1?("Yes"):("No"))},
            {title:"Group Preference",
            dataIndex:"GroupPreference",
            key:"GroupPreference"},
            {title:"Advisor",
            dataIndex:"Advisor",
            key:"Advisor"},
            {title:"Action",
            dataIndex:"id",
            key:"id",
            render:(text,record,index)=>(<span>
                    <Button id={text} type = "primary" onClick = {this.handleStudentUpdate}> Update </Button>
                    <Divider type = "vertical"/>
                    <Button id={text} type = "danger" onClick = {this.sHandleDelete}> Delete </Button>
                    </span>
                    )}],
            sdataSource: data
    }
    console.log(localStorage);
  }

  render() {
    return (
      <div className="App">
        <head>
            {/* <link rel="stylesheet" href="https://bootswatch.com/4/lumen/bootstrap.css" media="screen"></link> */}
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>
        </head>
       
        <NavComp></NavComp>
        
        
        
        {/* <div class="">
          <Table columns = {this.state.scolumns} dataSource = {this.state.sdataSource} />
        </div> */}
        
            <div class="col-md-12 col-lg-12">
                <Table columns = {this.state.scolumns} dataSource = {this.state.sdataSource} />
            </div>    
        
        
        {/* <button onClick={this.demonstrate}>Demonstrate</button> */}
      </div>
    );
  }
}

export {ProjectPage }; 
