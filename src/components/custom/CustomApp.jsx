import { useState, useEffect, useRef } from 'react';
import './CustomApp.css';
import { txtDef, btnDef } from '../../data/ComponentData';
import { checkOverflow } from '../../contexts/globalFunc';
import FormDialog from './formDialog/FormDialog';

function CustomApp() {
  const compCount = useRef(0);
  const [clientSize, setClientSize] = useState([window.innerWidth, window.innerHeight]);
  const [editComponentList, setEditComponentList] = useState([]);
  const [isMode, setMode] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentComp, setCurrentComp] = useState({});
  const addEditComponent = (comp) => {
    setEditComponentList([...editComponentList, comp]);
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
          if (checkOverflow(dataObj.x, dataObj.y, txtDef.width, txtDef.height, clientSize)) {
            break;
          }
          addEditComponent({
            id: compCount.current,
            type: 'txt',
            text: txtDef.text,
            width: txtDef.width,
            height: txtDef.height,
            style: {
              position: 'absolute',
              left: `${dataObj.x - txtDef.width / 2}px`,
              top: `${dataObj.y - txtDef.height / 2}px `,
              color: txtDef.color,
              margin: txtDef.margin,
              border: txtDef.border,
              fontSize: `${txtDef.fontSize}px`,
              textAlign: txtDef.textAlign,
              letterSpacing: `${txtDef.letterSpacing}px`,
              height: txtDef.height,
              width: txtDef.width,
              overflow: 'hidden'
            }
          });
          compCount.current += 1;
          break;
        case 'Button':
          if (checkOverflow(dataObj.x, dataObj.y, btnDef.width, btnDef.height, clientSize)) {
            break;
          }
          addEditComponent({
            id: compCount.current,
            type: 'btn',
            text: btnDef.text,
            width: btnDef.width,
            height: btnDef.height,
            style: {
              position: 'absolute',
              left: `${dataObj.x - btnDef.width / 2}px`,
              top: `${dataObj.y - btnDef.height / 2}px `,
              color: btnDef.color,
              border: btnDef.border,
              backgroundColor: btnDef.bgColor,
              margin: btnDef.margin,
              padding: btnDef.padding,
              height: btnDef.height,
              width: btnDef.width,
              overflow: 'hidden'
            }
          });
          compCount.current += 1;
          break;
        case 'Image':
          compCount.current += 1;
          break;
        case 'Input':
          compCount.current += 1;
          break;
        case 'Form':
          compCount.current += 1;
          break;
        default:
          break;
      }
    }
  };
  const openHandler = (id) => {
    editComponentList.map((comp, i) => {
      if (i === id) {
        setCurrentComp(comp);
      }
    });
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const dragEndHandler = (event, id) => {
    const draggedComponent = editComponentList.map((comp, i) => {
      const posX = event.clientX - comp.width / 2;
      const posY = event.clientY - comp.height / 2;
      if (
        i === id &&
        !checkOverflow(event.clientX, event.clientY, comp.width, comp.height, clientSize)
      ) {
        comp = {
          ...comp,
          style: {
            ...comp.style,
            left: `${posX}px`,
            top: `${posY}px`
          }
        };
        return comp;
      } else {
        return comp;
      }
    });
    setEditComponentList(draggedComponent);
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
  useEffect(() => {
    const newEditedList = editComponentList.map((comp, i) => {
      if (i === currentComp.id) {
        return currentComp;
      } else {
        return comp;
      }
    });
    setEditComponentList(newEditedList);
  }, [currentComp]);

  return (
    <div className="custom-app">
      {isMode ? (
        editComponentList.map((comp, i) => {
          switch (comp.type) {
            case 'txt':
              return (
                <p
                  key={comp.id}
                  style={comp.style}
                  draggable
                  onDragEnd={(e) => {
                    dragEndHandler(e, i);
                  }}>
                  {comp.text}
                </p>
              );
            case 'btn':
              return (
                <button
                  key={comp.id}
                  style={comp.style}
                  draggable
                  onDragEnd={(e) => {
                    dragEndHandler(e, i);
                  }}
                  onClick={() => {
                    openHandler(i);
                  }}>
                  {comp.text}
                </button>
              );
          }
        })
      ) : (
        <p>Preview</p>
      )}
      {isMode ? (
        <FormDialog
          open={open}
          comp={currentComp}
          setComp={setCurrentComp}
          closeHandler={closeHandler}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default CustomApp;
