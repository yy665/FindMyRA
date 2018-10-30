import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InsertComp from './components/InsertComp/InsertComp.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <body>
          This is test!
          <div>
            <InsertComp>

            </InsertComp>
          </div>
          
        </body>
      </div>
    );
  }
}

export default App;
