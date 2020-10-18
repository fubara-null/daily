import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import {Tasks} from '../components/layouts/Tasks'
import {useSelectedProjectValue} from '../context'
import {useProjectValue} from '../context'


jest.mock('../context',()=>({
    useProjectValue: jest.fn(()=>({
        setProjects: jest.fn(),
        projects: [
            {
                name: 'OFFICE',
                projectId: '1',
                userId: '1',
                docId: 'fAVOUR'
            },
            {
                name: 'MUSIC',
                projectId:'2',
                userId: '1',
                docId: 'Kinf'
            },
            {
                name: 'FOOTBALL',
                projectId :'3',
                userId: '1',
                docId: 'Coley'
            }
        ]
    })),
    useSelectedProjectValue: jest.fn()
       
})) 


jest.mock('../hooks',()=>({
    useTasks: ()=>({
        tasks:[{
            id:null,
            archived: false,
            date: '21/10/2020',
            projectId: '1',
            task: 'Would i rather be feared or robbed?',
            userId: '1'
        }]
    })
}))

beforeEach(cleanup)

describe('<Tasks/>', ()=>{
    afterEach(()=>{
        jest.clearAllMocks()
    });

    it('renders tasks',()=>{
        useSelectedProjectValue.mockImplementation(()=>({
            setSelectProject: jest.fn(()=> 'INBOX'),
            selectedProject: 'INBOX'
        }))

        const {queryByTestId} = render(<Tasks/>)
        expect(queryByTestId('tasks')).toBeTruthy()
        expect(queryByTestId('project-name').textContent).toBe('Inbox')
    })

    it('renders tasks with project title ',()=>{
        useSelectedProjectValue.mockImplementation(()=>({
            setSelectProject: jest.fn(()=> '1'),
            selectedProject: '1'
        }))

        const {queryByTestId} = render(<Tasks/>)
        expect(queryByTestId('tasks')).toBeTruthy()
        expect(queryByTestId('project-name').textContent).toBe('OFFICE')
    })

    it('renders task with a collated Title ',()=>{
        useSelectedProjectValue.mockImplementation(()=>({
            setSelectProject: jest.fn(()=> 'INBOX'),
            selectedProject: 'INBOX'
        }))

        const {queryByTestId} = render(<Tasks/>)
        expect(queryByTestId('tasks')).toBeTruthy()
        expect(queryByTestId('project-name').textContent).toBe('Inbox')
    })
})