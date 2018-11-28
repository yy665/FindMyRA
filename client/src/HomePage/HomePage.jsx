import React, { Component } from 'react';
// import {Route, Link} from 'react-router-dom'
import {  Route, Link } from 'react-router-dom';
import './HomePage.css';
// import PeopleComp from '../components/PeopleComp/PeopleComp.js';
// import UpdateComp from '../components/PeopleComp/UpdateComp.js';
import Home from '../components/Home.js';
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
      
        <div>
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
        </div>

        <p>
          <Link to="/login">Logout</Link>
        </p>

        
        <hr />
        <Route exact path = "/" component={Home} />
        

        
        {/* <button onClick={this.demonstrate}>Demonstrate</button> */}
      </div>
    );
  }
}

export {HomePage }; 
