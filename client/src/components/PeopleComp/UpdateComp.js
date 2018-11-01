import React, {Component} from 'react';
import {Table, Divider} from 'antd';
import Button from 'antd/lib/button'
import 'antd/dist/antd.css'
import './Testdata.js'



class UpdateComp extends Component {
	constructor(props){
		var data = global.constants[0];
		super(props);
		this.state = {

		//student display
			scolumns: [{
	title:"ID",
	dataIndex: "Student_id",
	key: "Student_id",
	},
	{title: "First Name",
	dataIndex: "FirstName",
	key: "FirstName"},
	{title:"Last Name",
	dataIndex:"LastName",
	key: "LastName"},
	{title:"Pursuing Degree",
	dataIndex:"Degree",
	key:"Degree"},
	{title:"School Year",
	dataIndex:"SchoolYear",
	key:"SchoolYear"},
	{title:"GPA",
	dataIndex:"GPA",
	key:"GPA"},
	{title:"Seeking Group",
	dataIndex:"SeekingStatus",
	key:"SeekingStatus",
	render:status=>(status===1?("Yes"):("No"))},
	{title:"Group Preference",
	dataIndex:"GroupPreference",
	key:"GroupPreference"},
	{title:"Advisor",
	dataIndex:"Advisor",
	key:"Advisor"},
	{title:"Action",
	dataIndex:"key",
	key:"key",
	render:(text,record,index)=>(<span>
			<Button id={text} type = "primary" onClick = {this.handleStudentUpdate}> Update </Button>
			<Divider type = "vertical"/>
			<Button id={text} type = "danger" onClick = {this.handleDelete}> Delete </Button>
			</span>
			)}],
//Advisor display
acolumns:[{
	title:"ID",
	dataIndex: "Advisor_id",
	key: "Advisor_id",
	},
	{title: "First Name",
	dataIndex: "FirstName",
	key: "FirstName"},
	{title:"Last Name",
	dataIndex:"LastName",
	key: "LastName"},
	{title:"Seeking Students",
	dataIndex:"SeekingStatus",
	key:"SeekingStatus",
	render:status=>(status===1?("Yes"):("No"))},
	{title:"Title",
	dataIndex:"Title",
	key:"Title"},
	{title:"Action",
	dataIndex:"key",
	key:"key",
	render:(text,record)=>(<span>
			<Button id={text} onClick = {this.handleAdvisorUpdate} type = "primary"> Update </Button>
			<Divider type = "vertical"/>
			<Button id={text} onClick = {this.handleDelete} type = "danger"> Delete </Button>
			</span>
			)}],

	//datasource
	sdataSource: data,
	adataSource: global.constants[1],

	//student info
	sid : 0,
                    sfirstname: null,
                    slastname: null,
                    sseeking: 1,
                    degree: "Undergraduate",
                    year: "Freshman",
                    gpa: 4.0,
                    group: null,
                    advisor: null,
                    



	//advisor info
	aid : 0,
                    afirstname: null,
                    alastname: null,
                    aseeking: 1,
                    title: null,

	fullsql: null
		};

		this.handleSChange = this.handleSChange.bind(this);
		this.handleAChange = this.handleAChange.bind(this);
        this.handleStudentUpdate = this.handleStudentUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdvisorUpdate = this.handleAdvisorUpdate.bind(this);


	}
	handleStudentUpdate(e){
		var Layer1 = document.getElementById('Layer1');
		var Layer2 = document.getElementById('Layer2');
		Layer2.style.visibility="hidden";
		Layer1.style.visibility = "visible";
		if(e.target.id === "s" || e.target.id === "u1"){
			Layer1.style.visibility="hidden";

			//send update query
			if(e.target.id === "u1"){
				var query = "FirstName="+this.state.sfirstname+ ",LastName=" + this.state.slastname +",SeekingStatus ="+this.state.sseeking+",Degree ="+this.state.degree+ ",GPA ="+this.state.gpa+ ",GroupPreference =" +this.state.group + ",Advisor=" + this.state.advisor +"\n";
				this.setState({fullsql: "UPDATE Student SET "+query+ "WHERE Student_id = " + this.state.sid});
			}
		}
		else{
			var id = e.target.id;
			this.setState({sid:this.state.sdataSource[id].Student_id});
			this.setState({sfirstname:this.state.sdataSource[id].FirstName});
			this.setState({slastname:this.state.sdataSource[id].LastName});
			this.setState({sseeking:this.state.sdataSource[id].SeekingStatus});

			this.setState({degree:this.state.sdataSource[id].Degree});
			this.setState({year:this.state.sdataSource[id].SchoolYear});
			this.setState({gpa:this.state.sdataSource[id].GPA});
			this.setState({group:this.state.sdataSource[id].GroupPreference});
			this.setState({advisor:this.state.sdataSource[id].Advisor});
		}
	}

	handleAdvisorUpdate(e){
		var Layer1 = document.getElementById('Layer1');
		var Layer2 = document.getElementById('Layer2');
		Layer1.style.visibility="hidden";
		Layer2.style.visibility = "visible";
		if(e.target.id === "p" || e.target.id === "u2"){
			Layer2.style.visibility="hidden";

			//send update query
			if(e.target.id === "u2"){
				var query = "FirstName="+this.state.afirstname+ ",LastName=" + this.state.alastname +",SeekingStatus ="+this.state.aseeking+",Title ="+this.state.title+"\n";
				this.setState({fullsql: "UPDATE Advisor SET "+query+ "WHERE Advisor_id = " + this.state.aid});
				
			}
		}
		else{
			var id = e.target.id;
			this.setState({aid:this.state.adataSource[id].Advisor_id});
			this.setState({afirstname:this.state.adataSource[id].FirstName});
			this.setState({alastname:this.state.adataSource[id].LastName});
			this.setState({aseeking:this.state.adataSource[id].SeekingStatus});

			this.setState({title:this.state.adataSource[id].Title});

		}
	}
	handleSChange(e){
        if(e.target.name === "firstname")this.setState({sfirstname:e.target.value});
        else if(e.target.name === "lastname")this.setState({slastname:e.target.value});
        else if(e.target.name === "seek"){
            var obj = document.getElementById(e.target.id);
            var index = obj.selectedIndex;
            var val = obj.options[index].value;
            if(val === "Yes")this.setState({sseeking: 1});
            else this.setState({sseeking:0});
        }
        else if(e.target.id ==="degree" || e.target.id === "year"){
            obj = document.getElementById(e.target.id);
            index = obj.selectedIndex;
            val = obj.options[index].value;
            if(e.target.id ==="degree")this.setState({degree:val});
            else this.setState({year:val});
        }
        else if(e.target.name === "gpa")this.setState({gpa:e.target.value});
        else if(e.target.name === "group")this.setState({group:e.target.value});
        else if(e.target.name === "advisor")this.setState({advisor:e.target.value});
		
	}


	handleAChange(e){
        if(e.target.name === "firstname")this.setState({afirstname:e.target.value});
        else if(e.target.name === "lastname")this.setState({alastname:e.target.value});
        else if(e.target.name === "seek2"){
            var obj = document.getElementById(e.target.id);
            var index = obj.selectedIndex;
            var val = obj.options[index].value;
            if(val === "Yes")this.setState({aseeking: 1});
            else this.setState({aseeking:0});
        }
        else if(e.target.name === "title")this.setState({title:e.target.value});
	}

	handleDelete(e){

	}

    render(){
    return(
        <div>
          Choose a profile to update.
          <div>
          <Table columns = {this.state.scolumns} dataSource = {this.state.sdataSource} />
          </div>

          <div id = "Layer1" style = {{visibility: "hidden"}}>
            <div>
            First name:
                <input type="text" name="firstname" onChange={this.handleSChange} defaultValue={this.state.sfirstname}></input>
                
                Last name:
                <input type="text" name="lastname" defaultValue={this.state.slastname} onChange={this.handleShange}></input>
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
                <input type="text" name="advisor" defaultValue={this.state.advisor} onChange={this.handleSChange}></input>
            </div>

            

            <span>
            <Button id = "u1" type="primary" onClick = {this.handleStudentUpdate}>Update</Button>
            <Button id = "s" type="default" onClick = {this.handleStudentUpdate}>Cancel</Button><br></br>
            </span>
            </div>


          <div>
          <Table columns = {this.state.acolumns} dataSource = {this.state.adataSource} />
          </div>

          <div id = "Layer2" style = {{top: "100px", visibility: "hidden"}}>
            <div>
            First name:
                <input type="text" name="firstname" onChange={this.handleAChange} defaultValue={this.state.afirstname}></input>
                
                Last name:
                <input type="text" name="lastname" defaultValue={this.state.alastname} onChange={this.handleAChange}></input>
            </div>

            <div>
                Are you seeking for student now?
            <select name = "seek2" id = "seek2" onChange={this.handleAChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            </div>

            <div> 
            What is your title?
            <input type="text" name="title" defaultValue={this.state.title} onChange={this.handleAChange}></input>
            </div>

            

            
            <Button id = "u2" type="primary" onClick = {this.handleAdvisorUpdate}>Update</Button>
            <Button id = "p" type="default" onClick = {this.handleAdvisorUpdate}>Cancel</Button>
            </div>

            <div>
            Final SQL:<br></br>
            {this.state.fullsql}
            </div>

            
        </div>
        
    );
	}
} 

export default UpdateComp;