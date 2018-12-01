import React, { Component } from 'react';
import NavComp from '../components/NavComp/NavComp';
import Button from 'antd/lib/button';


class AdvisorSetting extends Component{
    constructor(props){
        super(props);
        console.log(localStorage.user.split("\"")[3]);
        this.state = {
            id: null,
            Password: null,
            FirstName: null,
            LastName: null,
            SeekingStatus:0,
            Title: null,
        }
        var data = {
            id: localStorage.user.split("\"")[3]
        }

        fetch(`/queryAdvisor`, {
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
              this.setState({Title:data[0].Title});
          } )

          this.handleChange = this.handleChange.bind(this);
        this.handleChangeSubmit = this.handleChangeSubmit.bind(this);


    }

    handleChange(e){
        if(e.target.name === "password")this.setState({Password:e.target.value});
        else if(e.target.name === "firstname")this.setState({FirstName:e.target.value});
        else if(e.target.name === "lastname")this.setState({LastName:e.target.value});
        else if(e.target.name === "title")this.setState({Title:e.target.value});
    }

    handleChangeSubmit(e){
        console.log(this.state);
        var data = {
            id: this.state.id,
            Password: this.state.Password,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            SeekingStatus:this.state.SeekingStatus,
            Title: this.state.Title,
        }
        fetch(`/updateAdvisor`, {
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
                    <input type="text" class="form-control" name="lastname" defaultValue={this.state.LastName} onChange={this.handleChange} ></input> <text style={{color:"red"}}></text>
                </div>
    
                <div>
                    What is Your title?
                    <input type="text" class="form-control" name="title" defaultValue={this.state.Title} onChange={this.handleChange} ></input>
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

export {AdvisorSetting }; 