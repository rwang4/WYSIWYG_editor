import { useState, useEffect, useRef } from 'react';
import './CustomApp.css';
import { txtDef, btnDef, imgDef, inputDef, formDef } from '../../data/ComponentData';
import FormDialog from './form/FormDialog';

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

  const dragEndHandler = (event, id, isSpecial) => {
    const draggedComponent = editComponentList.map((comp, i) => {
      const posX = isSpecial
        ? event.clientX - (2 * comp.width) / 2
        : event.clientX - comp.width / 2;
      const posY = isSpecial ? event.clientY : event.clientY - comp.height / 2;
      if (
        i === id &&
        !checkOverflow(
          isSpecial ? event.clientX - comp.width / 2 : event.clientX,
          isSpecial ? event.clientY + comp.height / 2 : event.clientY,
          comp.width,
          comp.height,
          clientSize
        )
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
                    dragEndHandler(e, i, false);
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
                    dragEndHandler(e, i, false);
                  }}
                  onClick={() => {
                    openHandler(i);
                  }}>
                  {comp.text}
                </button>
              );
            case 'img':
              return (
                <img
                  key={comp.id}
                  src={comp.src}
                  alt={comp.alt}
                  style={comp.style}
                  onDragEnd={(e) => {
                    dragEndHandler(e, i, true);
                  }}
                />
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

const checkOverflow = (x, y, width, height, windowSize) => {
  if (
    x + width / 2 > windowSize[0] ||
    y + height / 2 > windowSize[1] ||
    y - height / 2 < 0 ||
    x - width / 2 < 0
  ) {
    return true;
  }
};

export default CustomApp;
