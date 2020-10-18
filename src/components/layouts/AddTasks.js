import React,{useState} from 'react';
import moment from 'moment';
import {firebase} from '../../firebase'
import {useSelectedProjectValue} from '../../context'
import {ProjectOverlay} from './ProjectOverlay';
import { TaskDateOverlay } from './TaskDateOverlay';
import {
    FaRegCalendarAlt,
    FaRegListAlt
} from 'react-icons/fa';

export const AddTask = ({
    showAddTaskMain = true,
    shouldShowMain = false,
    showQuickAddTask,
    setShowQuickAddTask,
})=>{
    const [task, setTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [project, setProject] = useState('');
    const [showMain, setShowMain] = useState(shouldShowMain);
    const [showProjectOverlay, setShowProjectOverlay] = useState(false);
    const [showTaskDate,setShowTaskDate] = useState(false);

    const {selectedProject}= useSelectedProjectValue();


    const addTask = ()=>{
        const projectId = project || selectedProject
        let collatedDate = '';
         
        // if today and next 7days is clicked at the sidebar, compute the date
        if(projectId === 'TODAY'){
           collatedDate = moment().format('DD/MM/YYYY')
        }else if (projectId === 'NEXT_7'){
           collatedDate = moment().add(7, 'days').format('DD/MM/YYYY')
        }

        return(
            task &&
            projectId &&
            firebase
            .firestore()
            .collection('tasks')
            .add({
                archived: false,
                date: collatedDate || taskDate,
                projectId,
                task,
                userId: '1'
            })
            .then(()=>{
                setTask('');
                setShowMain(false);
                setProject([...project]);
                setShowProjectOverlay(false);

            })
        )
    }

    //jsx here
    return (
       <div className={ showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
           data-testid='add-task-comp'
       >
           {showAddTaskMain && (
               <div 
                  className='add-task__shallow'
                  data-testid='show-main-action'
                  onClick={()=> setShowMain(!showMain)}
                  onKeyDown={()=> setShowMain(!showMain)}
                  role="button"
                  tabIndex={0}
               >
                   <span className='add-task__plus'>+</span>
                   <span className='add-task__text'>Add Task </span>
               </div>
           )}

           {(showMain || showQuickAddTask) && (
               <div className='add-task__main' data-testid='add-task-main'>
                   { showQuickAddTask && (
                       <div data-testid='quick-add-task'>
                        <h2 className='header'>Quick Add Task</h2>
                        <span
                        className='add-task__cancel-x'
                        data-testid='add-task-quick-cancel'
                        onClick={()=>{
                            setShowMain(false);
                            setShowProjectOverlay(false);
                            setShowQuickAddTask(false);
                        }}

                        onKeyDown={()=>{
                            setShowMain(false);
                            setShowProjectOverlay(false);
                            setShowQuickAddTask(false);
                        }}
                        tabIndex={0}
                        role='button'
                        >
                            X
                        </span>
                       </div>
                   )}

                   <TaskDateOverlay
                   setTaskDate={setTaskDate}
                   showTaskDate={showTaskDate}
                   setShowTaskDate={setShowTaskDate}
                   />
                   <ProjectOverlay 
                    setProject={setProject}
                    setShowProjectOverlay={setShowProjectOverlay} 
                    showProjectOverlay={showProjectOverlay}
                    />

                   <input
                      type='text'
                      value={task}
                      className='add-task__content'
                      data-testid='add-task-content'
                      onChange={(e)=> setTask(e.target.value)}

                   />
                   <button
                    type='button'
                    className='add-task__submit'
                    data-testid='add-task'
                    onClick={()=> {
                        showQuickAddTask ? addTask() && setShowQuickAddTask(false):addTask()
                    }}
                    >
                        Add task
                   </button>
                   {!showQuickAddTask && (
                       <span
                       className='add-task__cancel'
                       data-testid='add-task-main-cancel'
                        onClick={()=>{
                            setShowMain(false);
                            setShowProjectOverlay(false)
                        }}

                        onKeyDown={()=>{
                            setShowMain(false);
                            setShowProjectOverlay(false)
                        }}
                        tabIndex={0}
                        role='button'
                       >
                           Cancel 
                       </span>
                   )}

                   <span
                   onClick={()=> setShowProjectOverlay(!showProjectOverlay)}
                   onKeyDown={()=> setShowProjectOverlay(!showProjectOverlay)}
                   tabIndex={0}
                   role='button'
                   data-testid='show-project-overlay'
                   className='add-task__project'
                   >
                       <FaRegListAlt/>
                   </span>

                   <span
                    onClick={()=> setShowTaskDate(!showTaskDate)}
                    onKeyDown={()=> setShowTaskDate(!showTaskDate)}
                    tabIndex={0}
                    role='button'
                    data-testid='show-task-date-overlay'
                    className='add-task__date'
                   >
                       <FaRegCalendarAlt/>
                   </span>
                   </div>
           )}
       </div>
    )
}