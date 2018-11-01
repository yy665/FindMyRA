import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom'
import './App.css';
import PeopleComp from './components/PeopleComp/PeopleComp.js';
import UpdateComp from './components/PeopleComp/UpdateComp.js';
import Home from './components/Home.js';
import DeleteComp from './components/PeopleComp/DeleteComp.js';
import Query from './components/PeopleComp/Query.js';

// const server = 'http://127.0.0.1:3001';



class App extends Component {

  async demonstrate(){
    // let data = {name: "dong",
    // state: "test"};
    // console.log(data);
    // let res = await axios.post(`${server}/insert`, qs.stringify(data));
    // let res = await axios.post(`/insert`, qs.stringify(data));
    fetch(`/demonstrate`, {
      method: 'Get',
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Methods':'POST, GET'
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
        <Link to = "/FindPeople"> Find Profiles </Link>
        </div>
        <div>
        <Link to = "/Edit"> Update Information </Link>
        </div>
        <div>
        <Link to = "/Delete"> Delete Your Profile </Link>
        </div>

        
        <hr />
        <Route exact path = "/" component={Home} />
        <Route path = "/Insert" component = {PeopleComp}/>
        <Route path = "/Edit" component = {UpdateComp}/>
        <Route path = "/FindPeople" component = {Query}/>
        <Route path = "/Delete" component = {DeleteComp}/>
        <button onClick={this.demonstrate}>Demonstrate</button>
      </div>
    );
  }
}

export default App;
