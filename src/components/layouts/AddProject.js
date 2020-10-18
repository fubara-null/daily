import React, { useState } from 'react'
import { firebase } from '../../firebase'
import {generatePushId} from '../../helpers';
import { useProjectValue } from '../../context';


export const AddProject = ({shouldShow = false})=> {
    const [show, setShow] = useState(shouldShow);
    const [projectName, setProjectName] = useState('');
    const { setProjects} = useProjectValue();
    const projectId = generatePushId();

    const addProject = () =>
        projectName && 
        firebase
        .firestore()
        .collection('project')
        .add({
            name: projectName,
            projectId,
            userId: '1'
        })
        .then(()=>{
            setProjects('');
            setProjectName('');
            setShow(false);
        });
    

    return(
        <div className='add-project' data-testid='add-project'>
            { show && (
                <div className='add-project__input' data-testid='add-project-inner'>
                    <input
                      data-testid='project-name'
                      type='text'
                      className='add-project__name'
                      value={projectName}
                      onChange={(e)=> setProjectName(e.target.value)}
                      placeholder='Name your project'
                    />
                    <button 
                    className='add-project__submit'
                    type='button'
                    onClick={()=> addProject()}
                    data-testid='add-project-submit'>
                        Add 
                    </button>
                    
                    <span
                    onClick={()=>setShow(false)}
                    onKeyDown={()=>setShow(false)}
                    data-testid='hide-project-overlay'
                    className='add-project__cancel'
                    role='button'
                    tabIndex={0}
                    >
                        Cancel
                    </span>
                </div>
            )}
            <span className='add-project__plus'>+</span>
            <span
              arial-label='Add Project'
              data-testid='add-project-action'
              className='add-project__text'
              onClick={()=> setShow(!show)}
              onKeyDown={()=> setShow(!show)}
              role='button'
              tabIndex={-1}
            >
                Add Project
            </span>
        </div>
    )
}