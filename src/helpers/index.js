 import {collatedTask} from '../constant';
 

 export const getTitle = (projects, id)=>{
    let title =projects.find(project=> project.projectId === id)
     return title;
 }

 export const getCollatedTitle = (collatedTasks, key)=>{
    const theCollatedTask = collatedTasks.find(collated=> collated.key === key)
    return theCollatedTask;
 }

 export const collatedTasksExist = (selectedTask) => {
     const task = collatedTask.find(task=> task.key === selectedTask)
     return task;
        
 }

 export const generatePushId = (()=>{
    const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

    const lastRandChars = [];

    return function() {
       let now = new Date().getTime()

       const timeStampChars = new Array(8);

       for(var i= 7; i >= 0; i--){
          timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
          now = Math.floor(now / 64);
       }

       let id = timeStampChars.join('');

       for(i= 0; i < 12;  i++){
          id+= PUSH_CHARS.charAt(lastRandChars[i])
       }

       return id;
    }
 })();

