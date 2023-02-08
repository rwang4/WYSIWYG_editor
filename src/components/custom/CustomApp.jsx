import { useState, useEffect, useRef } from 'react';
import './CustomApp.css';
import { textDefault, buttonDefault } from '../../data/ComponentData';
import EditButton from './edit/EditButton';
import { checkOverflow } from '../../contexts/functions';
import { WindowContextProvider } from '../../contexts/WindowContext';

function CustomApp() {
  const txtCount = useRef(0);
  const btnCount = useRef(0);
  const imgCount = useRef(0);
  const inputCount = useRef(0);
  const formCount = useRef(0);
  const [clientSize, setClientSize] = useState([window.innerWidth, window.innerHeight]);
  const [editComponentList, setEditComponentList] = useState([]);
  const [previewComponentList, setPreviewComponentList] = useState([]);
  const [isMode, setMode] = useState(true);
  const addEditComponent = (comp) => {
    setEditComponentList([...editComponentList, comp]);
  };
  const addPreviewComponent = (comp) => {
    setPreviewComponentList([...previewComponentList, comp]);
  };
  const changeMode = () => {
    setMode(!isMode);
  };
  const eventHandler = (event) => {
    if (event.data == 'modeChange') {
      changeMode();
    } else {
      const dataObj = JSON.parse(event.data);
      switch (dataObj.type) {
        case 'Text':
          txtCount.current += 1;
          break;
        case 'Button':
          btnCount.current += 1;
          if (
            checkOverflow(
              dataObj.x,
              dataObj.y,
              buttonDefault.width,
              buttonDefault.height,
              clientSize
            )
          ) {
            break;
          }
          addEditComponent({
            type: 'btn',
            comp: (
              <EditButton
                key={`btn${btnCount.current}`}
                x={dataObj.x - buttonDefault.width / 2}
                y={dataObj.y - buttonDefault.height / 2}
              />
            )
          });
          break;
        case 'Image':
          imgCount.current += 1;
          break;
        case 'Input':
          inputCount.current += 1;
          break;
        case 'Form':
          formCount.current += 1;
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('message', eventHandler, false);
    return () => {
      window.removeEventListener('message', eventHandler);
    };
  });
  useEffect(() => {
    const handleWindowResize = () => {
      setClientSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
  const editDisplayComponents = editComponentList.map((c) => {
    return c.comp;
  });
  useEffect(() => {}, [clientSize]);
  return (
    <div className="custom-app">
      <WindowContextProvider>
        {isMode ? editDisplayComponents : previewComponentList}
      </WindowContextProvider>
    </div>
  );
}

export default CustomApp;
