import './mainApp.css';
import EditorContainer from './webEditor/EditorContainer';
import Header from './header/Header';
import CustomContainer from './custom/CustomContainer';
function MainApp() {
  return (
    <div className="mainApp">
      <Header />
      <div className="rowC">
        <CustomContainer />
        <EditorContainer />
      </div>
    </div>
  );
}

export default MainApp;
