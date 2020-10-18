import {useState, useEffect} from 'react';
import {collatedTasksExist} from '../helpers';
import moment from 'moment';
import {firebase} from '../firebase'

export const useTasks = selectedTask =>{
    const[tasks, setTask] = useState([]);
    const[archivedTask, setArchivedTask] = useState([]);



    useEffect(()=>{

        let unsubscribe = firebase.firestore().collection('tasks').where('userId', '==', '1')
        // unsubscribe = selectedTask  && !collatedTasksExist(selectedTask)
        //             ?(unsubscribe = unsubscribe.where('projectId', '==', selectedTask))
        //             : selectedTask === 'TODAY'
        //             ?(unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY')))
        //             : selectedTask === 'INBOX' || selectedTask === 0
        //             ?(unsubscribe  = unsubscribe.where('date', '==', ''))
        //             :unsubscribe;

        if(selectedTask && !collatedTasksExist(selectedTask)){
            unsubscribe= unsubscribe.where('projectId', '==', selectedTask)
        }
        else if( selectedTask === 'TODAY'){
            unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY'))
        }
        else if ( selectedTask === 'INBOX' || selectedTask === 0){
            unsubscribe  = unsubscribe.where('date', '==', '')
        }

        unsubscribe = unsubscribe.onSnapshot(snapshot => {
            const newTask = snapshot.docs.map(task => ({
                id: task.id,
                ...task.data()
            }))

            
        setTask(
            selectedTask === 'NEXT_7'
              ? newTask.filter(task => moment(task.date, 'DD/MM/YYYY').diff(moment(), 'days') <=7 && 
                task.archived !==true
              )
              : newTask.filter(task => task.archived !==true)
        );

        setArchivedTask(
           newTask.filter(task => task.archived !==false)
        );

        })

        return () =>unsubscribe();

    }, [selectedTask])

    return {tasks, archivedTask}

}

export const useProject = () =>{
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        firebase.firestore().collection('project')
        .where('userId', '==', '1')
        .orderBy('projectId')
        .get()
        .then(snapshot => {
            const allProject = snapshot.docs.map(project =>({
                docId: project.id,
                ...project.data()
            }));

            if(JSON.stringify(allProject) !== JSON.stringify(projects)){
                setProjects(allProject)
            }
        });
    },[projects])

    return {projects, setProjects}
}