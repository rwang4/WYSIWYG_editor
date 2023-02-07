import { useState, useEffect, useContext } from 'react';
import ModeContext from '../../contexts/ModeContext';
import './CustomApp.css';
import EditButton from './edit/EditButton';

function CustomApp() {
  const [editComponentList, setEditComponentList] = useState([]);
  const [dataObj, setDataObj] = useState({});
  const { isEdit } = useContext(ModeContext);
  const addEditComponent = (comp) => {
    setEditComponentList(editComponentList.concat(comp));
  };
  useEffect(() => {
    window.addEventListener(
      'message',
      function (e) {
        // if (e.origin !== 'http://localhost:5173') return;
        setDataObj(JSON.parse(e.data));
        switch (dataObj.type) {
          case 'Text':
            return;
          case 'Button':
            addEditComponent(<EditButton x={dataObj.x} y={dataObj.y} />);
            return;
          case 'Image':
            return;
          case 'Input':
            return;
          case 'Form':
            return;
        }
      },
      false
    );
  }, []);
  return <div className="customize--app">{isEdit ? <p>Edit Mode</p> : <p>Preview Mode</p>}</div>;
}

export default CustomApp;
