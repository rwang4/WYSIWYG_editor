import { useState, useEffect } from 'react';
import useModeContext from '../../contexts/ModeContext';
import './CustomApp.css';
import EditButton from './edit/EditButton';

function CustomApp() {
  const [editComponentList, setEditComponentList] = useState([]);
  const [dataObj, setDataObj] = useState({});
  const { isEdit } = useModeContext();
  console.log(isEdit);
  const addEditComponent = (comp) => {
    setEditComponentList(editComponentList.concat(comp));
  };
  const eventHandler = (event) => {
    // if (e.origin !== 'http://localhost:5173') return;
    setDataObj(JSON.parse(event.data));
    switch (dataObj.type) {
      case 'Text':
        break;
      case 'Button':
        addEditComponent(<EditButton x={dataObj.x} y={dataObj.y} />);
        break;
      case 'Image':
        break;
      case 'Input':
        break;
      case 'Form':
        break;
    }
  };
  useEffect(() => {
    window.addEventListener('message', eventHandler, false);
  }, []);
  return <div className="custom-app"></div>;
}

export default CustomApp;
