import React, { useState } from 'react';
import { Header} from './components/layouts/Header'
import { Content } from './components/layouts/Content';
import { ProjectValue, SelectedProjectValue} from './context';


 export const App = ({darkmodeDefault = false}) =>  { 
    const [darkmode, setDarkMode] = useState(darkmodeDefault)
  return (
    <SelectedProjectValue>
      <ProjectValue>
        <main
         data-testid='application'
         className={darkmode ? 'darkmode' : undefined}>
           <Header
           darkmode={darkmode}
            setDarkMode={setDarkMode}
           />
           <Content/>
        </main>
      </ProjectValue>
   </SelectedProjectValue>
   
  );
}


