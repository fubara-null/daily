import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import {ProjectOverlay} from '../components/layouts/ProjectOverlay'
import {useProjectValue} from '../context'


beforeEach(cleanup)

jest.mock('../context', ()=>({
   useProjectValue: jest.fn(()=> ({
    setProjects: jest.fn(),
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

describe('<ProjectOverlay/>',()=>{

    afterEach(()=>{
        jest.clearAllMocks()
    })

    describe('Success', ()=>{
       it('render <ProjectOverlay/>',()=>{
          const setProject = jest.fn();
          const showProjectOverlay = true;
          const setShowProjectOverlay = jest.fn(()=> !showProjectOverlay);

          const {queryByTestId} = render(<ProjectOverlay 
            setProject ={setProject}
            showProjectOverlay
            setShowProjectOverlay= {setShowProjectOverlay}/>)

            expect(queryByTestId('project-overlay')).toBeTruthy()

            fireEvent.click(queryByTestId('project-overlay-action'));
            expect(setProject).toHaveBeenCalled();
       })
    })


    describe('Failure', ()=>{
       it('does not render the projectoverlay with any project', ()=>{
           useProjectValue.mockImplementation(()=>({
               projects: []
           }))
           const {queryByTestId} = render(<ProjectOverlay showProjectOverlay/>)
           expect(queryByTestId('project-overlay')).toBeTruthy()
           expect(queryByTestId('project-overlay-action')).toBeFalsy()
       })
    })
})