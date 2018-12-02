import React, { Component } from 'react';
// import {Route, Link} from 'react-router-dom'
import {  Route, Link } from 'react-router-dom';
import './HomePage.css';
// import PeopleComp from '../components/PeopleComp/PeopleComp.js';
// import UpdateComp from '../components/PeopleComp/UpdateComp.js';
import Home from '../components/Home.js';
import { Button,Navbar, Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import Project from '../ProjectPage/ProjectPage'
import NavComp from '../components/NavComp/NavComp';
// import VisualizeComp from '../components/PeopleComp/VisualizeComp.js';
// import Recommend from '../components/PeopleComp/Recommendation.js';


// const server = 'http://127.0.0.1:3001';



class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      user : localStorage
    };
    console.log(localStorage);
  }
  async demonstrate(){
    var data = {
      table: "Student"
    }
    fetch(`/demonstrate`, {
      method: 'Post',
      body: JSON.stringify(data),
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Methods':'POST, GET',
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(
      data => {
        console.log(data)
      }
    )
    
  }

  render() {
    return (
      <div className="App">
      <NavComp></NavComp>

      <div class="jumbotron">
          <h1 class="display-4">Welcome to FindMyRA!</h1>
          <p class="lead">Find out research opportunities and perfect projects thorough the click!</p>
          <hr class="my-4"></hr>
          <p>We let you add any project or person into the database by yourself. You can also search for researches, students and projects. One click to apply for the projects you're interested in. Get connected now! </p>
        </div>

        <div class="card text-white bg-dark mb-3" >
          <div class="card-header">Leave Us Comments</div>
          <div class="card-body">
            {/* <h5 class="card-title">Email: dongl3@illinois.edu</h5> */}
            <h5 class="card-title">Email: jianing2@illinois.edu</h5>
            <p class="card-text">Feel free to contact us and let us know your thoughts!</p>
          </div>
        </div>

      
      
        {/* <div>
        <Link to = "/"> Home </Link>
        </div>

        <div>
        <Link to = "/Insert"> Add Your Profile </Link>
        </div>
        
        <div>
        <Link to = "/Edit"> Update Information </Link>
        </div>


        <div>
        <Link to = "/Recommend"> Recommendation </Link>
        </div>

        <div>
        <Link to = "/Visualize"> Visualize FIND RA </Link>
        </div> */}

        {/* <p>
          <Link to="/login">Logout</Link>
        </p>

        
        <hr />
        <Route exact path = "/" component={Home} /> */}
        

        
        {/* <button onClick={this.demonstrate}>Demonstrate</button> */}
      </div>
    );
  }
}

export {HomePage }; 
