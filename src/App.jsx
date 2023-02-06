import { useState } from 'react';

import './App.css';
import EditorContainer from './components/webEditor/EditorContainer';
import Header from './components/header/Header';
import { ModeProvider } from './ModeContext';
import CustomizeApp from './components/customizes/CustomizeApp';

function App() {
  const [isEdit, setMode] = useState(true);

  function changeMode() {
    setMode(!isEdit);
  }

  return (
    <div className="App">
      <ModeProvider value={{ isEdit, changeMode }}>
        <Header />
        <div className="rowC">
          <CustomizeApp />
          <EditorContainer />
        </div>
      </ModeProvider>
    </div>
  );
}

export default App;
