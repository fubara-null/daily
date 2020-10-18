import React from 'react';
import {Checkbox} from './Checkbox';
import {useTasks} from '../../hooks';
import {getTitle, getCollatedTitle, collatedTasksExist} from '../../helpers';
import {useSelectedProjectValue, useProjectValue} from '../../context';
import {collatedTask} from '../../constant'
import {AddTask} from './AddTasks'


export const Tasks = ()=>{

    const {selectedProject} = useSelectedProjectValue();
    const {projects} = useProjectValue();
    const {tasks} = useTasks(selectedProject);


    let projectName = '';
   

    if(projects.length > 0  && selectedProject && !collatedTasksExist(selectedProject)){
        projectName = getTitle(projects, selectedProject).name    
    }
    
    if(projects.length > 0 && selectedProject && collatedTasksExist(selectedProject)){
        projectName = getCollatedTitle(collatedTask, selectedProject).name
        
    }

    return (
        
        <div className='tasks' data-testid ='tasks'>
<h2 data-testid = 'project-name'>{projectName}</h2>
            <ul className='tasks__list'>
                { tasks.map(task =>(
                         <li key={`${task.id}`}>
                        <Checkbox id ={task.id}/>
                        <span>{task.task}</span>
                    </li>
                ))} 
            </ul>
            <AddTask/>
            </div>
           

            

            

      
    );
}