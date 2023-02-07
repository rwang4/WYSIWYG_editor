import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ModeProvider } from './contexts/ModeContext';
import { RefProvider } from './contexts/RefContext';
import MainApp from './components/mainApp';
import CustomApp from './components/custom/CustomApp';

function App() {
  const [isEdit, setMode] = useState(true);

  function changeMode() {
    setMode(!isEdit);
  }

  return (
    <div className="App">
      <RefProvider>
        <ModeProvider value={{ isEdit, changeMode }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainApp />} />
              <Route path="/customApp/" element={<CustomApp />} />
            </Routes>
          </BrowserRouter>
        </ModeProvider>
      </RefProvider>
    </div>
  );
}

export default App;
