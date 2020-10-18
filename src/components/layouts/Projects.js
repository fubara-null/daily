import React, {useState} from 'react';
import { useSelectedProjectValue,useProjectValue} from '../../context';
import {SingleProject} from './SingleProject'


export const Project = ({activeValue = null})=>{
    const [ active, setActive] = useState(activeValue);
    const { setSelectProject} = useSelectedProjectValue();
    const { projects} = useProjectValue();

    return(
        projects && projects.map(project=> (
            <li
              key={project.projectId}
              data-doc-id={project.docId}
              data-testid='project'
              className={
                  active === project.projectId ? 'active sidebar__project'
                  : 'sidebar__project'
              }

            >
                <div
             data-testid='project-action'
              role='button'
              tabIndex={0}
              onClick = {() => {
                  setActive(project.projectId)
                  setSelectProject(project.projectId)
              }}

              
              onKeyDown = {() => {
                setActive(project.projectId)
                setSelectProject(project.projectId)
            }}
                >
                <SingleProject project={project}/>
                </div>
               
            </li>
        ))
    );
}