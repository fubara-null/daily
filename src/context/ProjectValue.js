import React, {createContext, useContext} from 'react';
import {useProject} from '../hooks';

export const ProjectContext = createContext();

export const ProjectValue = ({children})=>{
    const {projects, setProjects} = useProject();

    return(
        <ProjectContext.Provider value={{projects,setProjects}}>
            {children}
        </ProjectContext.Provider>
    )
}

export const useProjectValue = ()=> useContext(ProjectContext)