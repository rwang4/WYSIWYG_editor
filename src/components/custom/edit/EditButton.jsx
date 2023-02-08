import { useState, createRef, useLayoutEffect, useContext } from 'react';
import './EditButton.css';
import { buttonDefault } from '../../../data/ComponentData';
import { checkOverflow } from '../../../contexts/functions';
import { WindowContext } from '../../../contexts/WindowContext';

function EditButton(props) {
  const [x, setX] = useState(props.x);
  const [y, setY] = useState(props.y);
  const btnRef = createRef();
  const [btnWidth, setWidth] = useState(0);
  const [btnHeight, setHeight] = useState(0);
  const { clientHeight, clientWidth } = useContext(WindowContext);
  const btnStyle = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px `,
    color: buttonDefault.color,
    border: buttonDefault.border,
    backgroundColor: buttonDefault.bgColor,
    margin: buttonDefault.margin,
    padding: buttonDefault.padding
  };
  const handleDragEnd = (event) => {
    if (
      checkOverflow(event.clientX, event.clientY, btnWidth, btnHeight, [clientWidth, clientHeight])
    ) {
      return;
    }
    setX(event.clientX - btnWidth / 2);
    setY(event.clientY - btnHeight / 2);
  };
  useLayoutEffect(() => {
    setWidth(btnRef.current.offsetWidth);
    setHeight(btnRef.current.offsetHeight);
  }, []);

  return (
    <button
      className="custom-button"
      style={btnStyle}
      ref={btnRef}
      onClick
      draggable
      onDragEnd={handleDragEnd}>
      button
    </button>
  );
}

export default EditButton;
