import React from 'react';
import { PresentationDemo } from './components';
import { minimalPresentation, maximalPresentation } from './test-data/presentations';

function App() {
  return (
    <div className="App">
      <PresentationDemo 
        minimalPresentation={minimalPresentation}
        maximalPresentation={maximalPresentation}
      />
    </div>
  );
}

export default App;