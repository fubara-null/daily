import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import {App} from '../App'

beforeEach(cleanup)// Clean the Dom

describe('<App/>', ()=>{
    it('renders the application',()=>{
        const {queryByTestId} = render(
            <App/>)
            expect(queryByTestId('application')).toBeTruthy()
        
    });

    it('renders the application with darkmode', ()=>{
        const {queryByTestId}= render(<App darkmodeDefault/>)
        expect (queryByTestId('application')).toBeTruthy()
        expect(queryByTestId('application').classList.contains('darkmode')).toBeTruthy()
    });
})