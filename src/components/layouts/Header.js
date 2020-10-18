import React, { useState } from 'react';
import { AddTask} from './AddTasks';
import { FaPizzaSlice} from 'react-icons/fa'


  export const Header = ({
      darkmode,
      setDarkMode
    })=> {
        const [shouldShowMain, setShouldShowMain] = useState(false);
        const [showQuickAddTask, setShowQuickAddTask] = useState(false);
      return (
          <header className='header' data-testid='header'>
             <nav>
                 <div className='logo'>
                    <img src = 'images/logo.png' alt="Daily"  />
                 </div>

                 <div className='settings'>
                     <ul>
                         <li 
                       
                         className='settings__add'
                        
                         >
                             <button
                               data-testid='quick-add-task-action'
                               arial-label='Quick Add Task'
                               type='button'
                               onClick={()=>{
                                    setShouldShowMain(true);
                                    setShowQuickAddTask(true);
                                }}
                                onKeyDown={()=>{
                                    setShouldShowMain(true);
                                    setShowQuickAddTask(true);
                                }}
                             >
                             +
                             </button>
                            
                         </li>
                         <li 
                         
                         className='settings__darkmode'
                         >
                             <button
                             data-testid='darkmode-action'
                             aria-label='DarkMode on/off'
                             type='button'
                             onClick={()=> setDarkMode(!darkmode)}
                             onKeyDown={()=> setDarkMode(!darkmode)}
                             >
                                 <FaPizzaSlice/>
                             </button>
                         </li>
                    </ul>

                 </div>
             </nav>

             <AddTask
             showAddTaskMain={false}
             shouldShowMain={shouldShowMain}
             setShowQuickAddTask={setShowQuickAddTask}
             showQuickAddTask={showQuickAddTask}
             />
          </header>
      )
  }