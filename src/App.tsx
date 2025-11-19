import { PresentationDemo } from './components';
import { maximalPresentation } from './test-data/presentations';

export function App() {
  return (
    <div className="App">
      <PresentationDemo presentation={maximalPresentation} />
    </div>
  );
}