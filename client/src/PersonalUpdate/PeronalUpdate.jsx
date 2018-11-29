import React, {Component} from 'react';
import { Button,Navbar, Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';

class PersonalUpdate extends Component {
    // constructor(props){
        // this.handleSChange = this.handleSChange.bind(this);
    // }

    // handleSChange(e){
    //     if(e.target.name === "firstname")this.setState({sfirstname:e.target.value});
    //     else if(e.target.name === "lastname")this.setState({slastname:e.target.value});
    //     else if(e.target.name === "seek"){
    //         var obj = document.getElementById(e.target.id);
    //         var index = obj.selectedIndex;
    //         var val = obj.options[index].value;
    //         if(val === "Yes")this.setState({sseeking: 1});
    //         else this.setState({sseeking:0});
    //     }
    //     else if(e.target.id ==="degree" || e.target.id === "year"){
    //         obj = document.getElementById(e.target.id);
    //         index = obj.selectedIndex;
    //         val = obj.options[index].value;
    //         if(e.target.id ==="degree")this.setState({degree:val});
    //         else this.setState({year:val});
    //     }
    //     else if(e.target.name === "gpa")this.setState({gpa:e.target.value});
    //     else if(e.target.name === "group")this.setState({group:e.target.value});
    //     else if(e.target.name === "advisor")this.setState({advisor:e.target.value});
		
    // }
    
    render(){
        return(
            <div>
                {/* <div>
                    First name:
                    <input type="text" name="firstname" onChange={this.handleSChange} defaultValue={this.state.sfirstname}></input>
                    
                    Last name:
                    <input type="text" name="lastname" defaultValue={this.state.slastname} onChange={this.handleShange}></input> <text style={{color:"red"}}>(*required)</text>
                </div>

                <div>
                    Are you seeking for research opportunity or person?
                <select name ="seek" id = "seek" defaultValue={this.state.sseeking} onChange={this.handleSChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                </div>
                <div>
                    What degree are you pursuing now?
                    <select id = "degree" defaultValue={this.state.degree} onChange={this.handleSChange}>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Master">Master</option>
                    <option value="PHD">PHD</option>
                    </select>

                </div>

                <div>
                    School Year?
                    <select id = "year" defaultValue={this.state.year} onChange={this.handleSChange}>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Graduate">Graduate</option>
                    </select>
                </div>

                <div>
                    What is Your gpa?
                    <input type="number" name="gpa" Value={this.state.gpa} step="0.01" onChange={this.handleSChange} min = {0.0} max = {4.0} ></input>
                </div>

                <div>
                    Which group are you interested now?
                    <input type="text" name="group" defaultValue={this.state.group} onChange={this.handleSChange}></input>
                </div>

                <div>
                    Who is your advisor?
                    <input type="text" name="advisor" defaultValue={this.state.advisor} onChange={this.handleSChange}></input> <text style={{color:"red"}}>(*required)</text>
                </div> */}
            </div>
        )
    }
}

export {PersonalUpdate}; 