import { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import './CustomApp.css';
import { txtDef, btnDef, imgDef } from '../../data/ComponentData';
import { checkOverflow } from '../../contexts/globalFunc';
import FormDialog from './form/FormDialog';

function CustomApp() {
  const compCount = useRef(0);
  const [clientSize, setClientSize] = useState([window.innerWidth, window.innerHeight]);
  const [editComponentList, setEditComponentList] = useState([]);
  const [isMode, setMode] = useState(true);
  const [open, setOpen] = useState(false);
  const [canClick, setCanClick] = useState(true);
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
      console.log(dataObj.x, dataObj.y);
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
            x: dataObj.x - txtDef.width / 2,
            y: dataObj.y - txtDef.height / 2,
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
            x: dataObj.x,
            y: dataObj.y,
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
          if (checkOverflow(dataObj.x, dataObj.y, imgDef.width, imgDef.height, clientSize)) {
            break;
          }
          addEditComponent({
            id: compCount.current,
            type: 'img',
            src: imgDef.src,
            alt: 'Paris',
            width: imgDef.width,
            height: imgDef.height,
            x: dataObj.x - imgDef.width / 2,
            y: dataObj.y - imgDef.height / 2,
            style: {
              position: 'absolute',
              left: `${dataObj.x - imgDef.width / 2}px`,
              top: `${dataObj.y - imgDef.height / 2}px`,
              borderRadius: imgDef.borderRadius,
              height: imgDef.height,
              width: imgDef.width,
              overflow: 'hidden'
            }
          });
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
    if (!canClick) {
      setCanClick(true);
      return;
    }
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
  const onDragHandler = () => {
    setCanClick(false);
  };
  const onStopHandler = (event, data, i) => {
    const draggedComponent = editComponentList.map((comp, idx) => {
      const posX = comp.x + data.x - comp.width / 2;
      const posY = comp.y + data.y - comp.height / 2;
      if (idx === i) {
        comp = {
          ...comp,
          x: posX,
          y: posY,
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
                <Draggable
                  key={comp.id}
                  bounds="parent"
                  onStop={(e, data) => onStopHandler(e, data, i)}>
                  <p style={comp.style}>{comp.text}</p>
                </Draggable>
              );
            case 'btn':
              return (
                <Draggable
                  key={comp.id}
                  bounds="parent"
                  onDrag={onDragHandler}
                  onStop={(e, data) => onStopHandler(e, data, i)}>
                  <button
                    style={comp.style}
                    onClick={() => {
                      openHandler(i);
                    }}>
                    {comp.text}
                  </button>
                </Draggable>
              );
            case 'img':
              return (
                <Draggable
                  key={comp.id}
                  bounds="parent"
                  onStop={(e, data) => onStopHandler(e, data, i)}>
                  <img
                    src={comp.src}
                    alt={comp.alt}
                    style={comp.style}
                    onDragStart={(e) => {
                      e.preventDefault();
                    }}
                  />
                </Draggable>
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
