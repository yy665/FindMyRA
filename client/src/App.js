import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
// import Home from '../components/Home.js';
import PeopleComp from './components/PeopleComp/PeopleComp.js';
import UpdateComp from './components/PeopleComp/UpdateComp.js';
import VisualizeComp from './components/PeopleComp/VisualizeComp.js';
import Recommend from './components/PeopleComp/Recommendation.js';



// const server = 'http://127.0.0.1:3001';



class App extends React.Component {
  render() {
    return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-sm-8 col-sm-offset-2">
                    <Router>
                        <div>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path = "/Insert" component = {PeopleComp}/>
                            <Route path = "/Edit" component = {UpdateComp}/>
                            <Route path = "/Recommend" component = {Recommend}/>
                            <Route path = "/Visualize" component = {VisualizeComp}/>
                        </div>
                    </Router>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
