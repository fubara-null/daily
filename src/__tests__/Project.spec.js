import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import {Project} from '../components/layouts/Projects'


beforeEach(cleanup)

jest.mock('../context', ()=>({
   useSelectedProjectValue: jest.fn(()=>({
       setSelectProject: jest.fn(()=>'1')
   })),
   useProjectValue: jest.fn(()=> ({
    projects:[
        {
            name: 'Office',
            projectId: '1',
            userId: '1',
            docId: 'Scoot Micheal'

        }
    ],
   }))
}));


describe('<Project/>', ()=>{
   
    afterEach(()=>{
        jest.clearAllMocks()
    })

    describe('Success', ()=>{
        it('renders <Project/>',()=>{
            const {queryByTestId} = render(<Project/>)
            expect(queryByTestId('project')).toBeTruthy()
        });

        it('renders <Project/> and set active when clicked',()=>{
            const {queryByTestId} = render(<Project/>)
            expect(queryByTestId('project')).toBeTruthy()

            fireEvent.click(queryByTestId('project-action'))
            fireEvent.keyDown(queryByTestId('project-action'))

            expect(queryByTestId('project').classList.contains('active')).toBeTruthy()
        });
    })
})