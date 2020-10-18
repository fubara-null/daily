import React, { useState } from 'react';
import {
    FaChevronDown,
    FaInbox,
    FaRegCalendarAlt,
    FaRegCalendar
} from 'react-icons/fa';
import {Project} from './Projects';
import {useSelectedProjectValue} from '../../context';
import { AddProject } from './AddProject';

export const SideBar = ()=>{
    const [showProject, setShowProject] = useState(true);
    const [active, setActive] = useState('inbox');
    const {setSelectProject}  =  useSelectedProjectValue();
    return (
        <div className='sidebar' data-testid='sidebar'>
            <div className='sidebar__generic'>
                <ul>
                    <li  data-testid='inbox' className={ active === 'inbox' ? 'active' : undefined }
                      >
                          <div
                           data-testid='inbox-action'
                            onClick={()=> {
                                setActive('inbox');
                                setSelectProject('INBOX');
                             }}
                             onKeyDown={()=> {
                                setActive('inbox');
                                setSelectProject('INBOX');
                             }}
                             role='button'
                             tabIndex={0}
                             aria-label="Show Inbox Task"
                          >
                          <span>
                            <FaInbox/>
                        </span>
                        <span>Inbox</span>
                          </div>
                      
                    </li>
                    <li data-testid='today' className={ active === 'today' ? 'active' : undefined }
                       
                        >
                            <div
                             data-testid='today-action'
                             onClick={()=> {
                                setActive('today');
                                setSelectProject('TODAY');
                             }}
                             onKeyDown={()=> {
                                setActive('today');
                                setSelectProject('TODAY');
                             }}
                          
                             role='button'
                             tabIndex={0}
                             aria-label="Show Today Task"
                            >

                        <span>
                            <FaRegCalendar/>
                        </span>
                        <span>Today</span>
                        </div>
                        
                    </li>
                    <li data-testid='next_7' className={ active === 'next_7' ? 'active' : undefined }
                  >
                          <div
                          data-testid='next-7-action'
                            onClick={()=> {
                                setActive('next_7');
                                setSelectProject('NEXT_7');
                             }}
                             onKeyDown={()=> {
                                setActive('next_7');
                                setSelectProject('NEXT_7');
                             }}
                             role='button'
                             tabIndex={0}
                             aria-label="Show Next 7 Task"
                          >
                        <span>
                            <FaRegCalendarAlt/>
                        </span>
                        <span>Next 7 days</span>
                        </div>
                    </li>
                </ul>

            </div>

            <div 
            className='sidebar__middle'
             onClick={()=> setShowProject(!showProject)}
             onKeyDown={()=> setShowProject(!showProject)}
             >
                <span >
                    <FaChevronDown className={ !showProject ? 'hidden-projects' : undefined}/>
                </span>
                <h2>Projects</h2>  
            </div>

            <ul className='sidebar__projects'>
               { showProject && <Project/>}
            </ul>
            {showProject && <AddProject/>}
           
        </div>
    );
}