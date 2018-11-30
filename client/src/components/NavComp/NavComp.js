import React, {Component}  from 'react';
import { Button,Navbar, Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';

class NavComp extends React.Component {
    render() {
    return(
    <div>
        <head>
            <link rel="stylesheet" href="https://bootswatch.com/4/lumen/bootstrap.css" media="screen"></link>
            <link rel="stylesheet" href="https://bootswatch.com/_assets/css/custom.min.css"></link>
            {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link> */}
        </head>

        <div class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <div class="container">
            <a href="/" class="navbar-brand">HomePage</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link" href="/Project">Project</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/ProjectSearch">Search</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/">Link</a>
                </li>
                {/* <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id="download">Lumen <span class="caret"></span></a>
                <div class="dropdown-menu" aria-labelledby="download">
                    <a class="dropdown-item" href="https://jsfiddle.net/bootswatch/gqhenoox/">Open in JSFiddle</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="../4/lumen/bootstrap.min.css">bootstrap.min.css</a>
                    <a class="dropdown-item" href="../4/lumen/bootstrap.css">bootstrap.css</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="../4/lumen/_variables.scss">_variables.scss</a>
                    <a class="dropdown-item" href="../4/lumen/_bootswatch.scss">_bootswatch.scss</a>
                </div>
                </li> */}
            </ul>

            <ul class="nav navbar-nav ml-auto">
                <li class="nav-item">
                <a class="nav-link" href="/Setting">Personal Setting</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/login">Log Out</a>
                </li>
            </ul>

            </div>
        </div>
        </div>
      
      
      {/* <Navbar style={{marginBottom: 10}}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">HomePage</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="/Project">
            Project
          </NavItem>
          <NavItem eventKey={2} href="#">
            Search
          </NavItem>
          <NavItem eventKey={3} href="#">
            Link
          </NavItem>
          <NavItem eventKey={4} href="/Setting">
            Personal Setting
          </NavItem>
          <NavDropdown eventKey={5} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={5.1}>Action</MenuItem>
            <MenuItem eventKey={5.2}>Another action</MenuItem>
            <MenuItem eventKey={5.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={5.4}>Separated link</MenuItem>
          </NavDropdown>

          <NavItem eventKey={6} href="/login">
          Logout
          </NavItem>
        </Nav>
      </Navbar> */}


    </div>
        
    )}
} 

export default NavComp;