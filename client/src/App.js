import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
// import Home from '../components/Home.js';
import PeopleComp from './components/PeopleComp/PeopleComp.js';
import UpdateComp from './components/PeopleComp/UpdateComp.js';
import VisualizeComp from './components/PeopleComp/VisualizeComp.js';
import Recommend from './components/PeopleComp/Recommendation.js';
import { ProjectPage} from './ProjectPage';
import {PersonalUpdate} from './PersonalUpdate';
import {ProjectAdvisorPage} from './ProjectAdvisorPage';
import {ProjectDetailPage} from './ProjectDetailPage';
import {ProjectDetailRestrictedPage} from './ProjectDetailRestrictedPage';
import {StudentSetting} from './StudentSetting';
import {AdvisorSetting} from './AdvisorSetting';



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
                            <Route path="/register" component={RegisterPage} />
                            <Route path = "/Insert" component = {PeopleComp}/>
                            <Route path = "/Edit" component = {UpdateComp}/>
                            <Route path = "/Recommend" component = {Recommend}/>
                            <Route path = "/Visualize" component = {VisualizeComp}/>
                            <Route path = "/Project" component = {ProjectPage}/>
                            {/* <Route path = "/Setting" component = {PersonalUpdate}/> */}
                            <Route path = "/AdminUpdate" component = {UpdateComp}/>
                            <Route path = "/ProjectAdd" component = {ProjectAdvisorPage}/>
                            <Route path = "/ProjectDetail" component = {ProjectDetailPage}/>
                            <Route path = "/ProjectDetailRestrict" component = {ProjectDetailRestrictedPage}/>
                            <Route path = "/Setting" component = {StudentSetting}/>
                            <Route path = "/AdvisorSetting" component = {AdvisorSetting}/>
                        </div>
                    </Router>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
