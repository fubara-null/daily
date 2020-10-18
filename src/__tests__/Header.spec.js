import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import {Header} from '../components/layouts/Header'


jest.mock('../context', ()=>({
    useSelectedProjectValue: jest.fn(()=>({selectedProject: '1'})),
    useProjectValue: jest.fn(()=>({projects: []}))
}))

beforeEach(cleanup)

describe('<Header/>', ()=>{
    describe('<Header/>', ()=>{
       it('renders the header', ()=>{
           const {queryByTestId} = render(<Header/>)
           expect(queryByTestId('header')).toBeTruthy()
       });

       it('renders the header and set darkmode',()=>{
           const darkmode = false;
           const setDarkMode = jest.fn(()=> !darkmode)

           const {queryByTestId} = render(<Header darkmode={darkmode} setDarkMode={setDarkMode}/>)
           expect(queryByTestId('header')).toBeTruthy()

           fireEvent.click(queryByTestId('darkmode-action'))
           expect(setDarkMode).toHaveBeenCalledWith(true)
           
           fireEvent.click(queryByTestId('darkmode-action'))
           expect(setDarkMode).toHaveBeenCalledTimes(2)
       });


       it('renders the header and set darkmode WHEN keydown',()=>{
        const darkmode = false;
        const setDarkMode = jest.fn(()=> !darkmode)

        const {queryByTestId} = render(<Header darkmode={darkmode} setDarkMode={setDarkMode}/>)
        expect(queryByTestId('header')).toBeTruthy()


        fireEvent.keyDown(queryByTestId('darkmode-action'))
        expect(setDarkMode).toHaveBeenCalledWith(true)
        
    
        fireEvent.keyDown(queryByTestId('darkmode-action'))
        expect(setDarkMode).toHaveBeenCalledTimes(2)
    });

       it('renders the header and display the quickAdd TASK with onClick',()=>{
        const darkmode = false;
      
        const {queryByTestId} = render(<Header darkmode={darkmode} />)
        expect(queryByTestId('header')).toBeTruthy()

        fireEvent.click(queryByTestId('quick-add-task-action'))
        expect(queryByTestId('add-task-main')).toBeTruthy()

    });

    it('renders the header and display the quickadd TASK with onKeyDown',()=>{
        const darkmode = false;
      
        const {queryByTestId} = render(<Header darkmode={darkmode} />)
        expect(queryByTestId('header')).toBeTruthy()

        fireEvent.keyDown(queryByTestId('quick-add-task-action'))
        expect(queryByTestId('add-task-main')).toBeTruthy()

    });

    })

})