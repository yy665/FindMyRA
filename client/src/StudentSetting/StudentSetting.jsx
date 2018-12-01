import React, { Component } from 'react';
import NavComp from '../components/NavComp/NavComp';
import Button from 'antd/lib/button';


class StudentSetting extends Component{
    constructor(props){
        super(props);

        if(localStorage.user.split("\"")[39] === "Student"){
            console.log(localStorage.user.split("\"")[3]);
            this.state = {
                id: null,
                Password: null,
                FirstName: null,
                LastName: null,
                SeekingStatus:0,
                Degree: null,
                SchoolYear: null,
                GPA: null,
                GroupPreference:null,
                adAdvisor: "nobody@illinois.edu",
            }
            var data = {
                id: localStorage.user.split("\"")[3]
            }
    
            fetch(`/queryStudent`, {
                method: 'Post',
                body: JSON.stringify(data),
                headers:{
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials':true,
                  'Access-Control-Allow-Methods':'POST, GET',
                  "Content-Type": "application/json"
                }
              })
              .then( res=>res.json())
              .then(data=>{
                  console.log(data[0]);
                  this.setState({id:data[0].id});
                  this.setState({Password:data[0].Password});
                  this.setState({FirstName:data[0].FirstName});
                  this.setState({LastName:data[0].LastName});
                  this.setState({SeekingStatus:data[0].SeekingStatus});
                  this.setState({Degree:data[0].Degree});
                  this.setState({SchoolYear:data[0].SchoolYear});
                  this.setState({GPA:data[0].GPA});
                  this.setState({GroupPreference:data[0].GroupPreference});
                  this.setState({Advisor:data[0].Advisor});
              } )
        }     
        else{
            const { from } = this.props.location.state || { from: { pathname: "/AdvisorSetting" } };
            this.props.history.push(from);
            this.state = {
                id: null,
                Password: null,
                FirstName: null,
                LastName: null,
                SeekingStatus:0,
                Title: null,
            }
        }
        

          this.handleChange = this.handleChange.bind(this);
        this.handleChangeSubmit = this.handleChangeSubmit.bind(this);


    }

    handleChange(e){
        if(e.target.name === "password")this.setState({Password:e.target.value});
        else if(e.target.name === "firstname")this.setState({FirstName:e.target.value});
        else if(e.target.name === "lastname")this.setState({LastName:e.target.value});
        else if(e.target.id ==="degree" || e.target.id === "year"){
            var obj = document.getElementById(e.target.id);
            var index = obj.selectedIndex;
            var val = obj.options[index].value;
            if(e.target.id ==="degree")this.setState({Degree:val});
            else this.setState({SchoolYear:val});
        }
        else if(e.target.name === "gpa")this.setState({GPA:e.target.value});
    }

    handleChangeSubmit(e){
        console.log(this.state);
        var data = {
            id: this.state.id,
            Password: this.state.Password,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            SeekingStatus:this.state.SeekingStatus,
            Degree: this.state.Degree,
            SchoolYear: this.state.SchoolYear,
            GPA: this.state.GPA,
            GroupPreference:this.state.GroupPreference,
            Advisor: this.state.Advisor,
        }
        fetch(`/updateStudent`, {
            method: 'Post',
            body: JSON.stringify(data),
            headers:{
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials':true,
              'Access-Control-Allow-Methods':'POST, GET',
              "Content-Type": "application/json"
            }
          })
          .then( res=>res.json())
          .then(data=>{
              console.log(data);
          } )
    }

    render(){
        return (
            <div className="App">
              <head>
                  <link rel="stylesheet" href="https://bootswatch.com/4/lumen/bootstrap.css" media="screen"></link>
                  {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link> */}
              </head>
             
              <NavComp></NavComp>

              <div>
                    What's your email address?
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    <input type="text" class="form-control" name="email" onChange={this.handleChange} defaultValue={this.state.id}></input> <text style={{color:"red"}}></text>
                    

                    what is your password?
                    <input type="password" class="form-control" name="password" onChange={this.handleChange} defaultValue={this.state.Password}></input> <text style={{color:"red"}}></text>
                </div>
                <div>
                First name(*required):
                    <input type="text" class="form-control" name="firstname" onChange={this.handleChange} defaultValue={this.state.FirstName}></input> <text style={{color:"red"}}></text>
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    
                Last name(*required):
                    <input type="text" class="form-control" name="lastname" defaultValue="" onChange={this.handleChange} defaultValue={this.state.LastName}></input> <text style={{color:"red"}}></text>
                </div>

                <div>
                    What degree are you pursuing now?
                    <select class="custom-select" id = "degree" onChange={this.handleChange} defaultValue={this.state.Degree}>
                    <option selected="selected"> {this.state.Degree} </option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Master">Master</option>
                    <option value="PHD">PHD</option>
                    </select>
    
                </div>
    
                <div>
                    School Year?
                    <select class="custom-select" id = "year" onChange={this.handleChange}>
                    <option selected="selected"> {this.state.SchoolYear} </option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Graduate">Graduate</option>
                    </select>
                </div>
    
                <div>
                    What is Your gpa?
                    <input type="number" class="form-control" name="gpa"  step="0.01" onChange={this.handleChange} defaultValue={this.state.GPA} min = {0.0} max = {4.0} ></input>
                </div>
    

                <div>
                    <Button type = "danger" onClick = {this.handleChangeSubmit}> Change </Button>
                    <Button type = "primary" onClick = {this.handleBack}> Back </Button>
                </div>
                
      
                  
              
              
              {/* <button onClick={this.demonstrate}>Demonstrate</button> */}
            </div>
          );
    }
}

export {StudentSetting }; 