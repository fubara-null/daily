import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import {AddTask} from '../components/layouts/AddTasks'
import {useSelectedProjectValue} from '../context'

beforeEach(cleanup)
jest.mock('../context', ()=>({
    useSelectedProjectValue: jest.fn(()=> ({selectedProject: '1'})),
    useProjectValue: jest.fn(()=> ({projects: []}))
}))

jest.mock('../firebase', ()=>({
    firebase: {
        firestore: jest.fn(()=>({
            collection: jest.fn(()=>({
                add: jest.fn(()=> Promise.resolve('Never resolve firebase')),

            })),
        })),
    }
}));

describe('<AddTask/>', ()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    })

    describe('Success', ()=>{
        it('render <AddTask/>', ()=>{
            const {queryByTestId} = render(<AddTask/>)
            expect(queryByTestId('add-task-comp')).toBeTruthy()
        })

        it('render <AddTask/>quick overlay', ()=>{
            const setShowQuickAddTask = jest.fn()

            const {queryByTestId} = render(<AddTask
                 showAddTaskMain shouldShowMain={false}
                 showQuickAddTask setShowQuickAddTask ={setShowQuickAddTask}/>)
 
             expect(queryByTestId('quick-add-task')).toBeTruthy()

        });

        it('render <AddTask/> main shows when clicked on the button AddTask', ()=>{
            const {queryByTestId} = render(<AddTask showAddTaskMain/>)

            fireEvent.click(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-main')).toBeTruthy();
        });

        

        it('render <AddTask/> project overlay when clicked', ()=>{
            const {queryByTestId} = render(<AddTask showAddTaskMain/>)

            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy();

            fireEvent.click(queryByTestId('show-project-overlay'))
            expect(queryByTestId('project-overlay')).toBeTruthy()
        });

        it('render <AddTask/> Task Date overlay when clicked', ()=>{
            const {queryByTestId} = render(<AddTask showAddTaskMain/>)

            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.click(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeTruthy()
        });

        it('render <AddTask/> Cancel when onclicked', ()=>{
            const {queryByTestId} = render(<AddTask showAddTaskMain/>)

            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.click(queryByTestId('add-task-main-cancel'))
            expect(queryByTestId('add-task-main')).toBeFalsy()
        });

        it('hides the <AddTask/>when Cancel is  onKeyDown', ()=>{
            const {queryByTestId} = render(<AddTask showAddTaskMain/>)

            fireEvent.keyDown(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.keyDown(queryByTestId('add-task-main-cancel'))
            expect(queryByTestId('add-task-main')).toBeFalsy()
        });

        it('render <AddTask/> show QuickAddTask and Cancel when clicked', ()=>{
            const showQuickAddTask = true;
            const setShowQuickAddTask = jest.fn(()=> !showQuickAddTask)
            const {queryByTestId} = render(<AddTask
                 setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask/>);

            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.click(queryByTestId('add-task-quick-cancel'))
            expect(setShowQuickAddTask).toHaveBeenCalled()
        });

        it('render <AddTask/> show QuickAddTask and Cancel when onKeyDown', ()=>{
            const showQuickAddTask = true;
            const setShowQuickAddTask = jest.fn(()=> !showQuickAddTask)
            const {queryByTestId} = render(<AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask/>);

            fireEvent.keyDown(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.keyDown(queryByTestId('add-task-quick-cancel'))
            expect(setShowQuickAddTask).toHaveBeenCalled()
        });

        it('render <AddTask/> and adds a task and clears state', ()=>{

            useSelectedProjectValue.mockImplementation(()=>({
                selectedProject: 'INBOX'
            }))
            const showQuickAddTask    = true;
            const setShowQuickAddTask = jest.fn(()=> !showQuickAddTask)
            const {queryByTestId}     = render(<AddTask 
                setShowQuickAddTask={setShowQuickAddTask}
                showQuickAddTask
                />)
                fireEvent.click(queryByTestId('show-main-action'))
                expect(queryByTestId('add-task-content')).toBeTruthy()

                fireEvent.change(queryByTestId('add-task-content'),{
                    target: {value: 'I have many things to tell you'}
                })
                expect(queryByTestId('add-task-content').value).toBe('I have many things to tell you');

                fireEvent.click(queryByTestId('add-task'));
                expect(setShowQuickAddTask).toHaveBeenCalled()
        });

        it('renders <AddTask/> task date', ()=>{
            useSelectedProjectValue.mockImplementation(()=>({
                selectedProject: '1'
            }));

            const {queryByTestId}     = render(<AddTask showMain/>)
                fireEvent.click(queryByTestId('show-main-action'))
                expect(queryByTestId('add-task-content')).toBeTruthy()
                expect(queryByTestId('add-task-main')).toBeTruthy()

                fireEvent.change(queryByTestId('add-task-content'),{
                    target: {value: 'I have many things to tell you'}
                })
                expect(queryByTestId('add-task-content').value).toBe('I have many things to tell you');

                fireEvent.click(queryByTestId('show-task-date-overlay'))
                // fireEvent.keyDown(queryByTestId('show-task-date-overlay'))

                expect(queryByTestId('task-date-overlay')).toBeTruthy()

                fireEvent.click(queryByTestId('task-date-today'))
                expect(queryByTestId('task-date-overlay')).toBeFalsy()

                fireEvent.click(queryByTestId('add-task'))


        });



        it('renders <AddTask/> task date when keyDown', ()=>{
            useSelectedProjectValue.mockImplementation(()=>({
                selectedProject: '1'
            }));

            const {queryByTestId}     = render(<AddTask showMain/>)
                fireEvent.click(queryByTestId('show-main-action'))
                expect(queryByTestId('add-task-content')).toBeTruthy()
                expect(queryByTestId('add-task-main')).toBeTruthy()

                fireEvent.change(queryByTestId('add-task-content'),{
                    target: {value: 'I have many things to tell you'}
                })
                expect(queryByTestId('add-task-content').value).toBe('I have many things to tell you');

              
                fireEvent.keyDown(queryByTestId('show-task-date-overlay'))
                expect(queryByTestId('task-date-overlay')).toBeTruthy()

                fireEvent.click(queryByTestId('task-date-today'))
                expect(queryByTestId('task-date-overlay')).toBeFalsy()

                fireEvent.click(queryByTestId('add-task'))


        });



        it('renders <AddTask/> project Overlay when keyDown', ()=>{
            useSelectedProjectValue.mockImplementation(()=>({
                selectedProject: '1'
            }));

            const {queryByTestId}     = render(<AddTask showMain/>)
                fireEvent.click(queryByTestId('show-main-action'))
                expect(queryByTestId('add-task-content')).toBeTruthy()
                expect(queryByTestId('add-task-main')).toBeTruthy()

                fireEvent.change(queryByTestId('add-task-content'),{
                    target: {value: 'I have many things to tell you'}
                })
                expect(queryByTestId('add-task-content').value).toBe('I have many things to tell you');

              
                fireEvent.keyDown(queryByTestId('show-project-overlay'))
                expect(queryByTestId('project-overlay')).toBeTruthy()
        });





        it('renders <AddTask/> task date with task date of TOMORROW', ()=>{
            useSelectedProjectValue.mockImplementation(()=>({
                selectedProject: '1'
            }));

            const {queryByTestId}     = render(<AddTask showMain/>)
                fireEvent.click(queryByTestId('show-main-action'))
                expect(queryByTestId('add-task-content')).toBeTruthy()
                expect(queryByTestId('add-task-main')).toBeTruthy()

                fireEvent.change(queryByTestId('add-task-content'),{
                    target: {value: 'I have many things to tell you'}
                })
                expect(queryByTestId('add-task-content').value).toBe('I have many things to tell you');

                fireEvent.click(queryByTestId('show-task-date-overlay'))
                expect(queryByTestId('task-date-overlay')).toBeTruthy()

                fireEvent.click(queryByTestId('task-date-tomorrow'))
                expect(queryByTestId('task-date-overlay')).toBeFalsy()

                fireEvent.click(queryByTestId('add-task'));

        });

        it('renders <AddTask/> task date with task date of NEXT WEEK ', ()=>{
            useSelectedProjectValue.mockImplementation(()=>({
                selectedProject: '1'
            }));

            const {queryByTestId}     = render(<AddTask showMain/>)
                fireEvent.click(queryByTestId('show-main-action'))
                expect(queryByTestId('add-task-content')).toBeTruthy()
                expect(queryByTestId('add-task-main')).toBeTruthy()

                fireEvent.change(queryByTestId('add-task-content'),{
                    target: {value: 'I have many things to tell you'}
                })
                expect(queryByTestId('add-task-content').value).toBe('I have many things to tell you');

                fireEvent.click(queryByTestId('show-task-date-overlay'))
                expect(queryByTestId('task-date-overlay')).toBeTruthy()

                fireEvent.click(queryByTestId('task-date-next-week'))
                expect(queryByTestId('task-date-overlay')).toBeFalsy()

                fireEvent.click(queryByTestId('add-task'))


        });
       
    });
});