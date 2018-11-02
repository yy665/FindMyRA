import React,{Component} from 'react';

class peopleComp extends Component {
    constructor(props){
        super(props);
        this.state = {id : 0,
                    identity: null,
                    firstname: null,
                    lastname: null,
                    seeking: 1,
                    degree: "Undergraduate",
                    year: "Freshman",
                    gpa: 4.0,
                    group: null,
                    advisor: null,
                    title: null,
                    sql:null,
                    fullsql: null};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    //handle submit form
    handleClick(e){
        if(e.target.id === "s"){
            this.setState({id:Math.floor(Math.random()*10000)});
            this.setState({fullsql: "INSERT INTO Student"+this.state.sql+
            "VALUES ("+this.state.id+","+this.state.firstname+","+this.state.lastname+","+this.state.seeking+","+this.state.degree+","+this.state.year+","+this.state.gpa+","+
            this.state.group+","+this.state.advisor+")"});

            // send to the backend
            var data = {
                table: "Student",
                id : Math.floor(Math.random()*10000),
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                seeking: this.state.seeking,
                degree: this.state.degree,
                year: this.state.year,
                gpa: this.state.gpa,
                group: this.state.group,
                advisor: this.state.advisor
            }

            fetch(`/insert`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials':true,
                  'Access-Control-Allow-Methods':'POST, GET',
                  "Content-Type": "application/json"
                }
              }).then(res => res.json())
              .then(response => console.log('Sucess:' , JSON.stringify(response)))
              .catch(error=> console.log('Error:', error));
        }
        else{
            this.setState({id: Math.floor(Math.random()*10000) + Math.random()*10000});
            this.setState({fullsql: "INSERT INTO Advisor" + this.state.sql+
            " VALUES ("+this.state.id+","+ this.state.firstname+","+this.state.lastname+","+this.state.seeking+","+this.state.title+")"});

            data = {
                table: "Advisor",
                id : Math.floor(Math.random()*10000),
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                seeking: this.state.seeking,
                title: this.state.title
            }
            fetch(`/insert`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials':true,
                  'Access-Control-Allow-Methods':'POST, GET',
                  "Content-Type": "application/json"
                }
              }).then(res => res.json())
              .then(response => console.log('Sucess:' , JSON.stringify(response)))
              .catch(error=> console.log('Error:', error));
        }
        
    }

    //handle changes in the form
    handleChange(e){
        if(e.target.name === "identity")this.ChooseInput();
        else if(e.target.name === "firstname")this.setState({firstname:e.target.value});
        else if(e.target.name === "lastname")this.setState({lastname:e.target.value});
        else if(e.target.name === "seek" || e.target.name === "seek2"){
            var obj = document.getElementById(e.target.id);
            var index = obj.selectedIndex;
            var val = obj.options[index].value;
            if(val === "Yes")this.setState({seeking: 1});
            else this.setState({seeking:0});
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
        else if(e.target.name === "title")this.setState({title:e.target.value});
    }


    //Render the form according to user's choice
    ChooseInput(){
        var obj = document.getElementById('researcher');
        var Layer1 = document.getElementById('Layer1');
        var Layer2 = document.getElementById('Layer2');
        var index=obj.selectedIndex; 
        var val = obj.options[index].value;
        if(val === "Student"){
            Layer1.style.visibility = "visible";
            Layer2.style.visibility = "hidden";
            this.setState({identity:val})
            this.setState({sql:"(id,FirstName,LastName,SeekingStatus,Degree,SchoolYear,GPA,GroupPreference,Advisor)"});
        }
        else if(val === "Professor"){
            Layer1.style.visibility = "hidden";
            Layer2.style.visibility = "visible";
            this.setState({identity:val});
            this.setState({sql:"(id,FirstName,LastName,SeekingStatus,Title)"})
        }
        else{
            Layer1.style.visibility = "hidden";
            Layer2.style.visibility = "hidden";
        }

    }

    
    render(){
    return(
        <div>
            
            <div>
                Are you a student or a professor?
            <select name = "identity" id = "researcher" onChange={this.handleChange}>
                <option value="choose">==Choose==</option>
                <option value="Student">Student</option>
                <option value="Professor">Professor</option>
            </select>
            </div>
        <div id = "Layer1" style = {{visibility: "hidden"}}>
            <div>
            First name:
                <input type="text" name="firstname" onChange={this.handleChange} defaultValue=""></input>
                
                Last name:
                <input type="text" name="lastname" defaultValue="" onChange={this.handleChange}></input>
            </div>

            <div>
                Are you seeking for research opportunity or person?
            <select name ="seek" id = "seek" onChange={this.handleChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            </div>
            <div>
                What degree are you pursuing now?
                <select id = "degree" onChange={this.handleChange}>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Master">Master</option>
                <option value="PHD">PHD</option>
                </select>

            </div>

            <div>
                School Year?
                <select id = "year" onChange={this.handleChange}>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Graduate">Graduate</option>
                </select>
            </div>

            <div>
                What is Your gpa?
                <input type="number" name="gpa" defaultValue={this.state.gpa} step="0.01" onChange={this.handleChange} min = {0.0} max = {4.0} ></input>
            </div>

            <div>
                Which group are you interested now?
                <input type="text" name="group" defaultValue="E.g: Team15" onChange={this.handleChange}></input>
            </div>

            <div>
                Who is your advisor?
                <input type="text" name="advisor" defaultValue="Professor" onChange={this.handleChange}></input>
            </div>

            

            
            <button id = "s" type="button" onClick = {this.handleClick}>Click to add!</button>
            <div>
            Final SQL:<br></br>
            {this.state.fullsql}
            </div>
            <div id = "ssql" style = {{position:'fixed', top: '200px', left:'20px'}}>
            INSERT {this.state.identity} <br></br>
            {this.state.sql} <br></br>
            VALUES ({this.state.firstname},{this.state.lastname},{this.state.seeking},{this.state.degree},{this.state.year},{this.state.gpa},
            {this.state.group},{this.state.advisor})


            </div>
            </div>

            


            <div id = "Layer2" style = {{top: "100px", visibility: "hidden"}}>
            <div>
            First name:
                <input type="text" name="firstname" onChange={this.handleChange} defaultValue=""></input>
                
                Last name:
                <input type="text" name="lastname" defaultValue="" onChange={this.handleChange}></input>
            </div>

            <div>
                Are you seeking for student now?
            <select name = "seek2" id = "seek2" onChange={this.handleChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            </div>

            <div> 
            What is your title?
            <input type="text" name="title" defaultValue="Professor" onChange={this.handleChange}></input>
            </div>

            

            
            <button id = "p" type="button" onClick = {this.handleClick}>Click to add!</button>
            <div>
            Final SQL:<br></br>
            {this.state.fullsql}
            </div>

            {/* <div onClick={this.insert}>INSERT</div> */}

            {/* <div id = "psql" style = {{position:'fixed', top: '500px', left:'20px'}}>
            INSERT {this.state.identity} <br></br>
            {this.state.sql} <br></br>
            VALUES ({this.state.firstname},{this.state.lastname},{this.state.seeking},{this.state.title})

            </div> */}



            </div>


            

            




        </div>
        
    );}
} 

export default peopleComp;