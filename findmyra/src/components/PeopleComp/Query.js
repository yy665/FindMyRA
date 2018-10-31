import React from 'react';

const Query = (prop) => {
    return(
        <div>
          Enter your preferences:
          <div>
                Are you searching for a student or a professor?
            <select name = "identity" id = "researcher">
                <option value="Student">Student</option>
                <option value="Professor">Professor</option>
            </select>
            </div>
            
        </div>
        
    )
} 

export default Query;