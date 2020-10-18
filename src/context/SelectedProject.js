import React, {createContext, useState, useContext} from 'react';


export const SelectedProjectContext = createContext();

export const SelectedProjectValue = ({children})=>{
    const [selectedProject, setSelectProject] = useState('1');

    return(
        <SelectedProjectContext.Provider value={{selectedProject,setSelectProject}}>
            {children}
        </SelectedProjectContext.Provider>
    )
}

export const useSelectedProjectValue = ()=> useContext(SelectedProjectContext);