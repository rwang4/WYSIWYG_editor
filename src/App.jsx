import { useState } from 'react';

import './App.css';
import EditorContainer from './components/webEditor/EditorContainer';
import Header from './components/header/Header';
import { ModeProvider } from './ModeContext';

function App() {
  const [isEdit, setMode] = useState(true);

  function changeMode() {
    setMode(!isEdit);
  }

  return (
    <div className="App">
      <ModeProvider value={{ isEdit, changeMode }}>
        <Header />
        <EditorContainer />
      </ModeProvider>
    </div>
  );
}

export default App;
