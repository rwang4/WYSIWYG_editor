import './App.css';
import EditorContainer from './components/webEditor/EditorContainer';
import Header from './components/header/Header';
import CustomContainer from './components/custom/CustomContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="rowC">
        <CustomContainer />
        <EditorContainer />
      </div>
    </div>
  );
}

export default App;
