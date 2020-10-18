import React, {useState} from 'react';
import {FaTrashAlt} from 'react-icons/fa';
import {firebase} from '../../firebase';
import { useSelectedProjectValue, useProjectValue } from '../../context';

export const SingleProject = ({project})=>{
    const {setProjects} = useProjectValue();
    const {setSelectProject} = useSelectedProjectValue();
    const [showConfirm, setConfirm] = useState(false);

    const deleteProject = (docId)=>{
        firebase
        .firestore()
        .collection('project')
        .doc(docId)
        .delete()
        .then(()=>{
            setProjects('')
            setSelectProject('Inbox')
        });

    };

    return(
        <>
        <span className='sidebar__dot'></span>
        <span className='sidebar__project-name'>{project.name}</span>
        <span className='sidebar__project-delete'
              data-testid='project-delete'
              onClick={()=> setConfirm(!showConfirm)}>

               <FaTrashAlt/>
            { showConfirm && (
                <div className='project-delete-modal'>
                    <div className='project-delete-modal__inner'>
                        <p>Are You Sure You Want To Delete This Project</p>
                        <button onClick={()=> deleteProject(project.docId)}>
                            Delete
                        </button>
                        <span onClick={()=> setConfirm(!showConfirm)}>Cancel</span>
                    </div>
                </div>
            )}
        </span>
        </>
    )
}