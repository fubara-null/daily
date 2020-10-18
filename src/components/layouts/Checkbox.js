import React from 'react';
import {firebase} from '../../firebase' 

export const Checkbox = ({id, taskDesc})=> {
    const archivedTask = ()=>{
        firebase
        .firestore()
        .collection('tasks')
        .doc(id)
        .update({
            archived: true
    
        })
    };

    return(
        <div 
        aria-label={`Mark ${taskDesc} as done!`}
        className = 'checkbox-holder' 
        data-testid= 'checkbox-action'
        onClick={()=> archivedTask()}>
            <span className='checkbox' />
        </div>
    );
   
}