import React, {Component} from 'react';
import {Table, Divider} from 'antd';
import Button from 'antd/lib/button'
import 'antd/dist/antd.css'
import './Testdata.js'



class UpdateComp extends Component {
	constructor(props){
		global.constants = [[],[]];
		var data = global.constants[0];
		super(props);
		this.state = {

		//student display
			scolumns: [{
				title:"ID",
				dataIndex: "id",
				key: "id",
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
				dataIndex:"id",
				key:"id",
				render:(text,record,index)=>(<span>
						<Button id={text} type = "primary" onClick = {this.handleStudentUpdate}> Update </Button>
						<Divider type = "vertical"/>
						<Button id={text} type = "danger" onClick = {this.sHandleDelete}> Delete </Button>
						</span>
						)}],
//Advisor display
			acolumns:[{
				title:"ID",
				dataIndex: "id",
				key: "id",
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
				dataIndex:"id",
				key:"id",
				render:(text,record)=>(<span>
						<Button id={text} onClick = {this.handleAdvisorUpdate} type = "primary"> Update </Button>
						<Divider type = "vertical"/>
						<Button id={text} onClick = {this.aHandleDelete} type = "danger"> Delete </Button>
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

				fullsql: null,



				//query info
				qsid: null,
				qsfirstname: null,
				qslastname: null,

				qaid: null,
				qafirstname: null,
				qalastname: null,


		};
		//get student data from database
		var sdata = {
			table: "Student"
		}
		fetch(`/demonstrate`, {
			method: 'Post',
			body: JSON.stringify(sdata),
			headers:{
			  'Access-Control-Allow-Origin': '*',
			  'Access-Control-Allow-Credentials':true,
			  'Access-Control-Allow-Methods':'POST, GET',
			  "Content-Type": "application/json"
			}
		  }).then(res => res.json()).then(
			sdata => {
				var jsontmp;	
			  	var tmp = global.constants[0];
			  	for(var i = 0; i < sdata.length; i ++){
					sdata[i]["key"] = 0;
					jsontmp = {
						key :0,
						Advisor: sdata[i].Advisor,
						Degree: sdata[i].Degree,
						GPA: sdata[i].GPA,
						GroupPreference: sdata[i].GroupPreference,
						SchoolYear: sdata[i].SchoolYear,
						SeekingStatus: sdata[i].SeekingStatus,
						id: sdata[i].id,
						FirstName: sdata[i].FirstName,
						LastName: sdata[i].LastName
					}
					tmp.push(jsontmp);
			  	}
			  	console.log(tmp);
			  	this.setState({sdataSource:tmp});
			}
		)
		//get Advisor info
		var sdata = {
			table: "Advisor"
		}
		fetch(`/demonstrate`, {
			method: 'Post',
			body: JSON.stringify(sdata),
			headers:{
			  'Access-Control-Allow-Origin': '*',
			  'Access-Control-Allow-Credentials':true,
			  'Access-Control-Allow-Methods':'POST, GET',
			  "Content-Type": "application/json"
			}
		  }).then(res => res.json()).then(
			adata => {
				var jsontmp;	
			  	var tmp = global.constants[1];
			  	for(var i = 0; i < adata.length; i ++){
					adata[i]["key"] = 1;
					jsontmp = {
						key :0,
						id: adata[i].id,
						Title: adata[i].Title,
						FirstName: adata[i].FirstName,
						LastName: adata[i].LastName
					}
					tmp.push(jsontmp);
			  	}
			  	console.log(tmp);
			  	this.setState({adataSource:tmp});
			}
		)

		this.handleSChange = this.handleSChange.bind(this);
		this.handleAChange = this.handleAChange.bind(this);
        this.handleStudentUpdate = this.handleStudentUpdate.bind(this);
		this.sHandleDelete = this.sHandleDelete.bind(this);
		this.aHandleDelete = this.aHandleDelete.bind(this);
        this.handleAdvisorUpdate = this.handleAdvisorUpdate.bind(this);

        this.handleSQuery = this.handleSQuery.bind(this);
        this.handleAQuery = this.handleAQuery.bind(this);


	}

	handleAQuery(e){
		var Layer4 = document.getElementById('AQuery');
		var button = document.getElementById('AQueryButton');
		if (e.target.id === "AQueryButton"){
			Layer4.style.visibility = "visible";
			button.style.visibility = "hidden";
		}
		else if(e.target.id === "q2"){
			Layer4.style.visibility = "hidden";
			button.style.visibility = "visible";

			var query = "";
			if(this.state.qaid!=null)query+= "Advisor_id = " + this.state.qaid;
			if(this.state.qalastname!=null){
				if(this.state.qaid!=null)query+=" AND ";

				query+= "LastName = " + this.state.qalastname;
			}
			if(this.state.qafirstname!=null){
				if(this.state.qaid!=null || this.state.qalastname!=null)query+=" AND ";
				query+= "FirstName = " + this.state.qafirstname;
			}

			this.setState({fullsql:"SELECT * FROM Advisor WHERE " + query});

			var adata = {
				table: "Advisor",
				id : this.state.qaid,
				firstname: this.state.qafirstname,
				lastname: this.state.qalastname
			}
			fetch(`/query`, {
				method: 'Post',
				body: JSON.stringify(adata),
				headers:{
				  'Access-Control-Allow-Origin': '*',
				  'Access-Control-Allow-Credentials':true,
				  'Access-Control-Allow-Methods':'POST, GET',
				  "Content-Type": "application/json"
				}
			  }).then(res => res.json()).then(
				adata => {
					var jsontmp;
					// console.log(adata);	

					//get the data
					var tmp = [];
					for(var i = 0; i < adata.length; i ++){
						adata[i]["key"] = 1;
					  	jsontmp = {
						  key :0,
						  id: adata[i].id,
						  Title: adata[i].Title,
						  FirstName: adata[i].FirstName,
						  LastName: adata[i].LastName,
						  SeekingStatus: adata[i].SeekingStatus
					  }
					  tmp.push(jsontmp);
					}
					console.log(adata);
					this.setState({adataSource:tmp});
				}
			)

			
		}
		else{
			if(e.target.name === "idquery")this.setState({qaid:e.target.value});
        	else if(e.target.name === "lnquery")this.setState({qalastname:e.target.value});
        	else if(e.target.name === "fnquery")this.setState({qafirstname:e.target.value});
			


		}
	}
	handleSQuery(e){
		var Layer3 = document.getElementById('SQuery');
		var button = document.getElementById('SQueryButton');
		if (e.target.id === "SQueryButton"){
			Layer3.style.visibility = "visible";
			button.style.visibility = "hidden";
		}
		else if(e.target.id === "q1"){
			Layer3.style.visibility = "hidden";
			button.style.visibility = "visible";
			var query = "";
			if(this.state.qsid!=null)query+= "Student_id = " + this.state.qsid;
			if(this.state.qslastname!=null){
				if(this.state.qsid!=null)query+=" AND ";

				query+= "LastName = " + this.state.qslastname;
			}
			if(this.state.qsfirstname!=null){
				if(this.state.qsid!=null || this.state.qslastname!=null)query+=" AND ";
				query+= "FirstName = " + this.state.qsfirstname;
			}

			this.setState({fullsql:"SELECT * FROM Student WHERE " + query});

			var sdata = {
				table: "Student",
				id : this.state.qsid,
				firstname: this.state.qsfirstname,
				lastname: this.state.qslastname

			}
			fetch(`/query`, {
				method: 'Post',
				body: JSON.stringify(sdata),
				headers:{
				  'Access-Control-Allow-Origin': '*',
				  'Access-Control-Allow-Credentials':true,
				  'Access-Control-Allow-Methods':'POST, GET',
				  "Content-Type": "application/json"
				}
			  }).then(res => res.json()).then(
				sdata => {

					console.log(sdata);	
					var jsontmp;
					// console.log(adata);	

					//get the data
					var tmp = [];
					for(var i = 0; i < sdata.length; i ++){
						sdata[i]["key"] = 1;
					  	jsontmp = {
							key :0,
							Advisor: sdata[i].Advisor,
							Degree: sdata[i].Degree,
							GPA: sdata[i].GPA,
							GroupPreference: sdata[i].GroupPreference,
							SchoolYear: sdata[i].SchoolYear,
							SeekingStatus: sdata[i].SeekingStatus,
							id: sdata[i].id,
							FirstName: sdata[i].FirstName,
							LastName: sdata[i].LastName
					  }
					  tmp.push(jsontmp);
					}
					console.log(sdata);
					this.setState({sdataSource:tmp});
					//re get the current database
				}
			)		

		}
		else{
			if(e.target.name === "idquery")this.setState({qsid:e.target.value});
        	else if(e.target.name === "lnquery")this.setState({qslastname:e.target.value});
        	else if(e.target.name === "fnquery")this.setState({qsfirstname:e.target.value});
			

		}

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
				this.setState({fullsql: "UPDATE Student SET "+query+ "WHERE id = " + this.state.sid});

				//change the status
				var sdata = {
					table: "Student",
					id : this.state.sid,
                	firstname: this.state.sfirstname,
                	lastname: this.state.slastname,
                	seeking: this.state.sseeking,
					degree: this.state.degree,
					gpa: this.state.gpa,
					group:this.state.group,
					advisor: this.state.advisor,

				}
				fetch(`/update`, {
					method: 'Post',
					body: JSON.stringify(sdata),
					headers:{
					  'Access-Control-Allow-Origin': '*',
					  'Access-Control-Allow-Credentials':true,
					  'Access-Control-Allow-Methods':'POST, GET',
					  "Content-Type": "application/json"
					}
				  }).then(res => res.json()).then(
					sdata => {

						console.log(sdata);	
						//re get the current database
						global.constants[1] = [];
						var s2data = {
							table: "Student"
						}
						fetch(`/demonstrate`, {
							method: 'Post',
							body: JSON.stringify(s2data),
							headers:{
							  'Access-Control-Allow-Origin': '*',
							  'Access-Control-Allow-Credentials':true,
							  'Access-Control-Allow-Methods':'POST, GET',
							  "Content-Type": "application/json"
							}
						  }).then(res => res.json()).then(
							s2data => {
								var jsontmp;	
								  var tmp = global.constants[1];
								  for(var i = 0; i < s2data.length; i ++){
									s2data[i]["key"] = 0;
									jsontmp = {
										key :0,
										Advisor: s2data[i].Advisor,
										Degree: s2data[i].Degree,
										GPA: s2data[i].GPA,
										GroupPreference: s2data[i].GroupPreference,
										SchoolYear: s2data[i].SchoolYear,
										SeekingStatus: s2data[i].SeekingStatus,
										id: s2data[i].id,
										FirstName: s2data[i].FirstName,
										LastName: s2data[i].LastName
									}
									tmp.push(jsontmp);
								  }
								  console.log(tmp);
								  this.setState({sdataSource:tmp});
							}
						)
					}
				)

			}
		}
		else{
			var id = e.target.id;
			for (var i = 0; i<this.state.sdataSource.length;i++){
				if(this.state.sdataSource[i].id === id) id = i;
			}
			this.setState({sid:this.state.sdataSource[id].id});
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
				this.setState({fullsql: "UPDATE Advisor SET "+query+ "WHERE id = " + this.state.aid});
				var adata = {
					table: "Advisor",
					id : this.state.aid,
                	firstname: this.state.afirstname,
                	lastname: this.state.alastname,
                	seeking: this.state.aseeking,
                	title: this.state.title
				}
				fetch(`/update`, {
					method: 'Post',
					body: JSON.stringify(adata),
					headers:{
					  'Access-Control-Allow-Origin': '*',
					  'Access-Control-Allow-Credentials':true,
					  'Access-Control-Allow-Methods':'POST, GET',
					  "Content-Type": "application/json"
					}
				  }).then(res => res.json()).then(
					adata => {

						console.log(adata);	
						//re get the current database
						global.constants[1] = [];
						var a2data = {
							table: "Advisor"
						}
						fetch(`/demonstrate`, {
							method: 'Post',
							body: JSON.stringify(a2data),
							headers:{
							  'Access-Control-Allow-Origin': '*',
							  'Access-Control-Allow-Credentials':true,
							  'Access-Control-Allow-Methods':'POST, GET',
							  "Content-Type": "application/json"
							}
						  }).then(res => res.json()).then(
							a2data => {
								var jsontmp;	
								  var tmp = global.constants[1];
								  for(var i = 0; i < a2data.length; i ++){
									a2data[i]["key"] = 1;
									jsontmp = {
										key :0,
										id: a2data[i].id,
										Title: a2data[i].Title,
										FirstName: a2data[i].FirstName,
										LastName: a2data[i].LastName,
										SeekingStatus: a2data[i].SeekingStatus
									}
									tmp.push(jsontmp);
								  }
								  console.log(tmp);
								  this.setState({adataSource:tmp});
							}
						)
					}
				)
				

				
			}
		}
		else{
			var id = e.target.id;
			for (var i = 0; i<this.state.adataSource.length;i++){
				if(this.state.adataSource[i].id === id) id = i;
			}
			this.setState({aid:this.state.adataSource[id].id});
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

	sHandleDelete(e){
		// var id = e.target.id;

		if(1){
			var adata = {
				table: "Student",
				id : e.target.id
			}
			fetch(`/delete`, {
				method: 'Post',
				body: JSON.stringify(adata),
				headers:{
				  'Access-Control-Allow-Origin': '*',
				  'Access-Control-Allow-Credentials':true,
				  'Access-Control-Allow-Methods':'POST, GET',
				  "Content-Type": "application/json"
				}
			  }).then(res => res.json()).then(
				adata => {

					console.log(adata);	
					//re get the current database
					global.constants[1] = [];
					var a2data = {
						table: "Student"
					}
					fetch(`/demonstrate`, {
						method: 'Post',
						body: JSON.stringify(a2data),
						headers:{
						  'Access-Control-Allow-Origin': '*',
						  'Access-Control-Allow-Credentials':true,
						  'Access-Control-Allow-Methods':'POST, GET',
						  "Content-Type": "application/json"
						}
					  }).then(res => res.json()).then(
						a2data => {
							var jsontmp;	
							  var tmp = global.constants[1];
							  for(var i = 0; i < a2data.length; i ++){
								a2data[i]["key"] = 1;
								jsontmp = {
									key :0,
									id: a2data[i].id,
									Title: a2data[i].Title,
									FirstName: a2data[i].FirstName,
									LastName: a2data[i].LastName
								}
								tmp.push(jsontmp);
							  }
							  console.log(tmp);
							  this.setState({sdataSource:tmp});
						}
					)
				}
			)
			

			
		}

	}

	aHandleDelete(e){
		// var id = e.target.id;

		if(1){
			var adata = {
				table: "Advisor",
				id : e.target.id
			}
			fetch(`/delete`, {
				method: 'Post',
				body: JSON.stringify(adata),
				headers:{
				  'Access-Control-Allow-Origin': '*',
				  'Access-Control-Allow-Credentials':true,
				  'Access-Control-Allow-Methods':'POST, GET',
				  "Content-Type": "application/json"
				}
			  }).then(res => res.json()).then(
				adata => {

					console.log(adata);	
					//re get the current database
					global.constants[1] = [];
					var a2data = {
						table: "Advisor"
					}
					fetch(`/demonstrate`, {
						method: 'Post',
						body: JSON.stringify(a2data),
						headers:{
						  'Access-Control-Allow-Origin': '*',
						  'Access-Control-Allow-Credentials':true,
						  'Access-Control-Allow-Methods':'POST, GET',
						  "Content-Type": "application/json"
						}
					  }).then(res => res.json()).then(
						a2data => {
							var jsontmp;	
							  var tmp = global.constants[1];
							  for(var i = 0; i < a2data.length; i ++){
								a2data[i]["key"] = 1;
								jsontmp = {
									key :0,
									id: a2data[i].id,
									Title: a2data[i].Title,
									FirstName: a2data[i].FirstName,
									LastName: a2data[i].LastName
								}
								tmp.push(jsontmp);
							  }
							  console.log(tmp);
							  this.setState({adataSource:tmp});
						}
					)
				}
			)
			

			
		}

	}

	async demonstrate(){
		var data = {
		  table: "Student"
		}
		fetch(`/demonstrate`, {
		  method: 'Post',
		  body: JSON.stringify(data),
		  headers:{
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials':true,
			'Access-Control-Allow-Methods':'POST, GET',
			"Content-Type": "application/json"
		  }
		}).then(res => res.json()).then(
		  data => {
			console.log(data)
			return data
		  }
		)
		
	  }

    render(){
    return(
        <div>
          Choose a profile to update.
		  {/* <div>
		  	<button onClick={this.demonstrate}>Demonstrate</button>
		  </div> */}
		  <Button id = "SQueryButton" type ="primary" style= {{visibility:"visible"}} onClick = {this.handleSQuery}> Search </Button>


		  <div id = "SQuery" style = {{visibility:"hidden"}}>
            <div> Search By ID:
            <input type = "text" name = "idquery" onChange = {this.handleSQuery}></input>
            </div>
            <div> Search By First Name:
            <input type = "text" name = "fnquery" onChange = {this.handleSQuery}></input>
            </div>
            <div> Search By Last Name:
            <input type = "text" name = "lnquery" onChange = {this.handleSQuery}></input>
            </div>
            <div>
            <Button id = "q1" type = "default" onClick = {this.handleSQuery}>Search</Button>
            </div>
            </div> <br></br>



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


            

           

		  <div id = "AQuery" style = {{visibility:"hidden"}}>
            <div> Search By ID:
            <input type = "text" name = "idquery" onChange = {this.handleAQuery}></input>
            </div>
            <div> Search By First Name:
            <input type = "text" name = "fnquery" onChange = {this.handleAQuery}></input>
            </div>
            <div> Search By Last Name:
            <input type = "text" name = "lnquery" onChange = {this.handleAQuery}></input>
            </div>
            <div>
            <Button id = "q2" type = "default" onClick = {this.handleAQuery}>Search</Button>
            </div>
            </div> <br></br>

            <div style = {{position:"relative",left:"10px"}}>
           <Button id = "AQueryButton" type ="primary" style={{visibility:"visible"}} onClick = {this.handleAQuery}> Search </Button>
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