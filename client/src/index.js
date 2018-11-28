import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<BrowserRouter>
//     <App />
//     {/* <Router>
//       {/* <div className="react-login-register">
//         {/* <CheckLogin></CheckLogin> */}
//         <PrivateRoute exact path="/" component={App} />
//         <Route path='/login' component={Login}></Route>
//           {/* <Route path='/register' component={Register}></Route> */}
//       </div> */}
//     </Router> */}
//   </BrowserRouter>, document.getElementById('root'));
ReactDOM.render(<BrowserRouter>
  <App />
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
