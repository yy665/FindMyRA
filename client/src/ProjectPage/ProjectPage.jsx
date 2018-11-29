import React, { Component } from 'react';
// import {Route, Link} from 'react-router-dom'
import {  Route, Link } from 'react-router-dom';
// import PeopleComp from '../components/PeopleComp/PeopleComp.js';
// import UpdateComp from '../components/PeopleComp/UpdateComp.js';
import Home from '../components/Home.js';
import {  Navbar, Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import NavComp from '../components/NavComp/NavComp';
import {Table, Divider} from 'antd';
import 'antd/dist/antd.css';
import Button from 'antd/lib/button';



class ProjectPage extends Component {
  constructor(props){
    super(props);
    global.constants = [[],[]];
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
        
        <NavComp></NavComp>

        <div>
          <Table columns = {this.state.scolumns} dataSource = {this.state.sdataSource} />
        </div>
        
        {/* <button onClick={this.demonstrate}>Demonstrate</button> */}
      </div>
    );
  }
}

export {ProjectPage }; 
