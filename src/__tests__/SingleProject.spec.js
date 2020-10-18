import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import {SingleProject} from '../components/layouts/SingleProject'

beforeEach(cleanup)

jest.mock('../firebase', ()=>({
    firebase:{
        firestore: jest.fn(()=>({
            collection: jest.fn(()=>({
                doc: jest.fn(()=>({
                    delete: jest.fn(()=> Promise.resolve('Just practising testing')),
                    update: jest.fn()
                })),
            })),
        })),
    }
}));

jest.mock('../context',()=>({
    useProjectValue: jest.fn(()=>({
        setProjects: jest.fn(),
        projects: [
            {
                name: 'OFFICE',
                projectId: '1',
                userId: '1',
                docId: 'fAVOUR'
            }
        ]
    })),
    useSelectedProjectValue: jest.fn(()=>({
        setSelectProject: jest.fn(()=> 'INBOX')
    }))
})) 

describe('<SingleProject/>', ()=>{
    const project = {
        name: 'OFFICE',
        projectId : '1',
        userId: '1',
        docId: 'fAVOUR'
    };

    describe('Success', ()=>{
        it('renders projects', ()=>{
            const {getByText} = render(<SingleProject project = {project}/>)
            expect(getByText('OFFICE')).toBeTruthy()
        });

        it('renders the delete overlay and then delete project using onClick', ()=>{
            const {queryByTestId, getByText} = render(<SingleProject project={project} />)

            fireEvent.click(queryByTestId('project-delete'));
            expect(getByText('Are You Sure You Want To Delete This Project')).toBeTruthy();

            fireEvent.click(getByText('Delete'))
        })

        
        it('renders the delete overlay and then CANCEL project using onClick', ()=>{
            const {queryByTestId, getByText} = render(<SingleProject project={project} />)

            fireEvent.click(queryByTestId('project-delete'));
            expect(getByText('Are You Sure You Want To Delete This Project')).toBeTruthy();
            
            fireEvent.click(getByText('Cancel'))
        })
    })
})
