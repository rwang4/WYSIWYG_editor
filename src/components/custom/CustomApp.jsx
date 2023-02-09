import { useState, useEffect, useRef, createRef } from 'react';
import './CustomApp.css';
import { txtDef, btnDef, imgDef, inputDef, formDef } from '../../data/ComponentData';
import FormDialog from './form/FormDialog';
import { formStyleData } from '../../data/StyleData';

/**
 * custom application component
 * Attributes
    ----------
    compCount: int
        stores number of components that has been added
    previewRef: HTML Object
        stores reference of preview HTML document
    clientSize : [windowWidth,windowHeight]
        dynamically stores Custom App window's width and height
    componentList : Object List
        contains all objects that used to create component objects in Custom App 
    previewComponent : 
        a list of preview component objects
    isMode : bool
        edit mode: true, preview mode:false
    open : bool
        Edittor Dialog shows when open: true
    currentComp : Object
        object of current dragging component
    Methods
    -------
    checkOverflow (x, y, width, height, windowSize)
        check whether component's new position after drag and drop is located inside the window
        if the new position of the component cause overflow return true else return false
    eventHandler(event)
        handles event when message passed from parent window.
        if message is modeChange: change isMode value
        else: add a new component object to the componentList with the x,y data passed from parent window
    dragEndHandler(event, id, isSpecial)
        handles event when component is drag and drop, set the new component inside componentList and re-render   the componentList
 */
function CustomApp() {
  const compCount = useRef(0);
  const previewRef = createRef();
  const [clientSize, setClientSize] = useState([window.innerWidth, window.innerHeight]);
  const [componentList, setComponentList] = useState([]);
  const [previewComponent, setpreviewComponent] = useState([]);
  const [isMode, setMode] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentComp, setCurrentComp] = useState({});

  const addEditComponent = (comp) => {
    setComponentList([...componentList, comp]);
  };
  const changeMode = () => {
    setMode(!isMode);
  };

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
              width: imgDef.width
            }
          });
          compCount.current += 1;
          break;
        case 'Input':
          if (checkOverflow(dataObj.x, dataObj.y, inputDef.width, inputDef.height, clientSize)) {
            break;
          }
          addEditComponent({
            id: compCount.current,
            type: 'input',
            inType: inputDef.inType,
            width: inputDef.width,
            height: inputDef.height,
            style: {
              position: 'absolute',
              left: `${dataObj.x - inputDef.width / 2}px`,
              top: `${dataObj.y - inputDef.height / 2}px `,
              boxSizing: inputDef.boxSizing,
              border: inputDef.border,
              height: inputDef.height,
              width: inputDef.width
            }
          });
          compCount.current += 1;
          break;
        case 'Form':
          if (checkOverflow(dataObj.x, dataObj.y, formDef.width, formDef.height, clientSize)) {
            break;
          }
          addEditComponent({
            id: compCount.current,
            type: 'form',
            width: formDef.width,
            height: formDef.height,
            style: {
              position: 'absolute',
              left: `${dataObj.x - formDef.width / 2}px`,
              top: `${dataObj.y - formDef.height / 2}px `,
              height: formDef.height,
              width: formDef.width,
              borderRadius: formDef.borderRadius,
              backgroundColor: formDef.bgColor,
              padding: formDef.padding
            }
          });
          compCount.current += 1;
          break;
        default:
          break;
      }
    }
  };
  const openHandler = (id) => {
    componentList.map((comp, i) => {
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
    const draggedComponent = componentList.map((comp, i) => {
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
    setComponentList(draggedComponent);
  };
  // eventListener listen to messages passed from parent window
  useEffect(() => {
    window.addEventListener('message', eventHandler, false);
    return () => {
      window.removeEventListener('message', eventHandler);
    };
  });
  // eventListener listen to window size change
  useEffect(() => {
    const handleWindowResize = () => {
      setClientSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  // when dragging component re-renders, set new editted component to the componentList
  useEffect(() => {
    const newEditedList = componentList.map((comp, i) => {
      if (i === currentComp.id) {
        return currentComp;
      } else {
        return comp;
      }
    });
    setComponentList(newEditedList);
  }, [currentComp]);
  // when mode changes to preview mode, set preview components according to the componentList
  useEffect(() => {
    if (isMode) {
      setComponentList(componentList);
      return;
    }
    const prevComponents = componentList.map((comp, i) => {
      switch (comp.type) {
        case 'txt':
          return (
            <p key={i} style={comp.style}>
              {comp.text}
            </p>
          );
        case 'btn':
          return (
            <button key={i} style={comp.style}>
              {comp.text}
            </button>
          );
        case 'img':
          return <img key={i} src={comp.src} alt={comp.alt} style={comp.style} />;
        case 'input':
          return <input key={i} type={comp.inType} style={comp.style} />;
        case 'form':
          return (
            <div key={i} style={comp.style} className={'custom-form'}>
              <form style={formStyleData}>
                <label>First Name</label>
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  placeholder="Your name.."
                  style={formStyleData.custom_form_input_type__text}
                />

                <label>Last Name</label>
                <input
                  type="text"
                  id="lname"
                  name="lastname"
                  placeholder="Your last name.."
                  style={formStyleData.custom_form_input_type__text}
                />

                <label>Country</label>
                <select id="country" name="country" style={formStyleData.custom_form_select}>
                  <option value="australia">Australia</option>
                  <option value="canada">Canada</option>
                  <option value="usa">USA</option>
                </select>

                <button type="button" style={formStyleData.custom_form_button}>
                  submit
                </button>
              </form>
            </div>
          );
      }
    });
    setpreviewComponent(prevComponents);
  }, [isMode]);

  // when preview component changes, send the innerHTML to the parent window for code export
  useEffect(() => {
    window.parent.postMessage(previewRef?.current?.innerHTML, '*');
  }, [previewComponent]);

  return (
    <div className="custom-app">
      {isMode ? (
        componentList.map((comp, i) => {
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
            case 'input':
              return (
                <input
                  key={comp.id}
                  type={comp.inType}
                  style={comp.style}
                  draggable
                  onDragEnd={(e) => {
                    dragEndHandler(e, i, false);
                  }}
                />
              );
            case 'form':
              return (
                <div
                  key={comp.id}
                  draggable
                  onDragEnd={(e) => {
                    dragEndHandler(e, i, false);
                  }}
                  style={comp.style}
                  className={'custom-form'}>
                  <form style={formStyleData}>
                    <label>First Name</label>
                    <input
                      type="text"
                      id="fname"
                      name="firstname"
                      placeholder="Your name.."
                      style={formStyleData.custom_form_input_type__text}
                    />

                    <label>Last Name</label>
                    <input
                      type="text"
                      id="lname"
                      name="lastname"
                      placeholder="Your last name.."
                      style={formStyleData.custom_form_input_type__text}
                    />

                    <label>Country</label>
                    <select id="country" name="country" style={formStyleData.custom_form_select}>
                      <option value="australia">Australia</option>
                      <option value="canada">Canada</option>
                      <option value="usa">USA</option>
                    </select>

                    <button type="button" style={formStyleData.custom_form_button}>
                      submit
                    </button>
                  </form>
                </div>
              );
          }
        })
      ) : (
        <div className={'preview-Page'} ref={previewRef}>
          {previewComponent}
        </div>
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
