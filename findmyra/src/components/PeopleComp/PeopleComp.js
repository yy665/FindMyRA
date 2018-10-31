import React from 'react';

const peopleComp = (prop) => {
    return(
        <div>
            
            <div>
                Are you a student or a professor?
            <select onchange="ChooseInput()">
                <option value="Students">Students</option>
                <option value="Professor">Professor</option>
            </select>
            </div>
            <div>
            First name:
                <input type="text" name="firstname" value="firtname"></input>
                
                Last name:
                <input type="text" name="lastname" value="lastname"></input>
            </div>

            <div>
                Are you seeking for research opportunity or person?
            <select>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            </div>
            <div>
                If you are a student, what degree are you purchasing now?
                <select>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Master">Master</option>
                <option value="PHD">PHD</option>
                </select>

            </div>

            <div>
                School Year?
                <input type="text" name="SchoolYear" value="E.g: 2018"></input>
            </div>

            <div>
                What is Your gpa?
                <input type="number" name="GPA" value="4.0" step="0.01" ></input>
            </div>

            <div>
                Which group are you interested now
                <input type="text" name="Group" value="E.g: Team15"></input>
            </div>

            <div>
                Advisor?
                <input type="text" name="Professor" value="Professor"></input>
            </div>

            

            
            <button type="button">Click to add!</button>
            
        </div>
        
    )
} 

export default peopleComp;