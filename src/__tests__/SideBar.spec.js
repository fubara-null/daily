import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import {SideBar} from '../components/layouts/SideBar'


beforeEach(cleanup)

jest.mock('../context', ()=>({
   useSelectedProjectValue: jest.fn(()=>({
       setSelectProject: jest.fn(()=>'INBOX')
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

describe('<SideBar/>', ()=>{

    afterEach(()=>{
        jest.clearAllMocks()
    })
    
    describe('Success', ()=>{
        it('renders the <Sidebar/>',()=>{
            const {queryByTestId} = render(<SideBar/>)
            expect(queryByTestId('sidebar')).toBeTruthy()
        });

        it('renders the <Sidebar/> and changes active to inbox',()=>{
            const {queryByTestId} = render(<SideBar/>)
            expect(queryByTestId('sidebar')).toBeTruthy()

            fireEvent.click(queryByTestId('inbox-action'))
            fireEvent.keyDown(queryByTestId('inbox-action'))

            expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy()
            expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
            expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()

        });

        it('renders the <Sidebar/> and changes active to TODAY',()=>{
            const {queryByTestId} = render(<SideBar/>)
            expect(queryByTestId('sidebar')).toBeTruthy()

            fireEvent.click(queryByTestId('today-action'))
            fireEvent.keyDown(queryByTestId('today-action'))

            expect(queryByTestId('today').classList.contains('active')).toBeTruthy()
            expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy()
            expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()

        });

        it('renders the <Sidebar/> and changes active to NEXT_7',()=>{
            const {queryByTestId} = render(<SideBar/>)
            expect(queryByTestId('sidebar')).toBeTruthy()

            fireEvent.click(queryByTestId('next-7-action'))
            fireEvent.keyDown(queryByTestId('next-7-action'))

            expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy()
            expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy()
            expect(queryByTestId('today').classList.contains('active')).toBeFalsy()

        });

        it('hides and show the sidebar projects using onClick', ()=>{
            const {queryByTestId, queryByText, getByText} = render(<SideBar/>)
            expect(queryByTestId('sidebar')).toBeTruthy()

            fireEvent.click(getByText('Projects'))
            expect(queryByText('Add Project')).toBeFalsy();

            
            fireEvent.click(getByText('Projects'))
            expect(queryByText('Add Project')).toBeTruthy();
        });

        it('hides and show the sidebar projects using onKeyDown', ()=>{
            const {queryByTestId, queryByText, getByText} = render(<SideBar/>)
            expect(queryByTestId('sidebar')).toBeTruthy()

            fireEvent.keyDown(getByText('Projects'))
            expect(queryByText('Add Project')).toBeFalsy();

            
            fireEvent.keyDown(getByText('Projects'))
            expect(queryByText('Add Project')).toBeTruthy();
        });

        
    })
     
})