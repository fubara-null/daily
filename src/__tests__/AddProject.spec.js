import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import {AddProject} from '../components/layouts/AddProject'


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
                projectId: '2',
                userId: '1',
                docId: 'Kinf'
            },
            {
                name: 'FOOTBALL',
                projectId:'3',
                userId: '1',
                docId: 'Coley'
            }
        ]
    })),
    useSelectedProjectValue: jest.fn()
       
})) 

jest.mock('../firebase', ()=>({
    firebase: {
        firestore: jest.fn(()=>({
            collection: jest.fn(()=>({
                add: jest.fn(()=> Promise.resolve('I resolved you')),

            })),
        })),
    }
}));

beforeEach(cleanup)

describe('<AddProject/>', ()=>{
    describe('Success' , ()=>{
      it('renders <AddProject/>  ', ()=>{
          const {queryByTestId} = render(<AddProject shouldShow/>);
          expect(queryByTestId('add-project')).toBeTruthy();

      });

      it('renders <AddProject/> and adds project', ()=>{
          const {queryByTestId} = render(<AddProject shouldShow/>)
          expect(queryByTestId('add-project')).toBeTruthy();

          fireEvent.change(queryByTestId('project-name'),{
              target:{value: 'Best of Messi'}
          });

          expect(queryByTestId('project-name').value).toBe('Best of Messi');

          fireEvent.click(queryByTestId('add-project-submit'))
      })

      it('hides the project overlay when onClick the Cancel button',()=>{
         const {queryByTestId, getByText}  = render(<AddProject shouldShow/>)
         expect(queryByTestId('add-project')).toBeTruthy();
         expect(queryByTestId('add-project-inner')).toBeTruthy();

         fireEvent.click(getByText('Cancel'));
         expect(queryByTestId('add-project')).toBeTruthy();
         expect(queryByTestId('add-project-inner')).toBeFalsy()
      })

      it('hides the project overlay when onKeyDown the Cancel button',()=>{
        const {queryByTestId, getByText}  = render(<AddProject shouldShow/>)
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeTruthy();

        fireEvent.keyDown(getByText('Cancel'));
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeFalsy()
     })

     
     it('hides the project overlay when onClick the AddProject Text',()=>{
        const {queryByTestId}  = render(<AddProject shouldShow/>)
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeTruthy();

        fireEvent.click(queryByTestId('add-project-action'));
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeFalsy()
     })

     it('hides the project overlay when onKeyDown the AddProject Text',()=>{
        const {queryByTestId}  = render(<AddProject shouldShow/>)
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeTruthy();

        fireEvent.keyDown(queryByTestId('add-project-action'));
        expect(queryByTestId('add-project')).toBeTruthy();
        expect(queryByTestId('add-project-inner')).toBeFalsy()
     });
    });
});