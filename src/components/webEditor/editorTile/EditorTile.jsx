import { useState } from 'react';

import './EditorTile.css';

function EditorTile(props) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [xAxis, setXAxis] = useState(0);
  const handleDragStart = (event) => {
    // This method runs when the dragging starts
    console.log('Started');
  };
  const handleDrag = (event) => {
    setXAxis(event.clientX);
    console.log(xAxis);
  };
  const handleDragEnd = (event) => {
    setX(event.clientX);
    setY(event.clientY);
    setXAxis(0);
    console.log(x, y);
  };

  return (
    <div
      className="editor-tile"
      title="Text"
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}>
      <div className="editor-tile-media">
        <svg viewBox="0 0 24 24">
          <path fill="currentColor" d={props.svgPath}></path>
        </svg>
      </div>
      <div className="editor-tile-label">{props.label}</div>
    </div>
  );
}

export default EditorTile;
