import React from 'react';
import { Button,Navbar, Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';

const NavComp = (prop) => {
    return(
        <div>
        <head>
        {/* <link rel="stylesheet" href="https://bootswatch.com/4/lumen/bootstrap.css" media="screen"></link> */}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>
      </head>
      <Navbar>
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
          <NavItem eventKey={4} href="#">
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
      </Navbar>
            
        </div>
        
    )
} 

export default NavComp;