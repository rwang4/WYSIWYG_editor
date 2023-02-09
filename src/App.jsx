import { useState } from 'react';
import './App.css';
import EditorContainer from './components/webEditor/EditorContainer';
import Header from './components/header/Header';
import CustomContainer from './components/custom/CustomContainer';
import CodeDialog from './components/codeDialog/CodeDialog';

function App() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <Header handleClickOpen={handleClickOpen} />
      <div className="rowC">
        <CustomContainer />
        <EditorContainer />
      </div>
      <CodeDialog open={open} handleClose={handleClose} />
    </div>
  );
}

export default App;
