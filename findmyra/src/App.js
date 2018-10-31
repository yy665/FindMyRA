import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom'
import './App.css';
import PeopleComp from './components/PeopleComp/PeopleComp.js';
import UpdateComp from './components/PeopleComp/UpdateComp.js';
import Home from './components/Home.js';
import DeleteComp from './components/PeopleComp/DeleteComp.js';
import Query from './components/PeopleComp/Query.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <body>
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

        </body>
        <hr />
        <Route exact path = "/" component={Home} />
        <Route path = "/Insert" component = {PeopleComp}/>
        <Route path = "/Edit" component = {UpdateComp}/>
        <Route path = "/FindPeople" component = {Query}/>
        <Route path = "/Delete" component = {DeleteComp}/>
      </div>
    );
  }
}

export default App;
