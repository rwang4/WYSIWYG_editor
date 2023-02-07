import { useState, useEffect } from 'react';
import { useRefContext } from '../../../contexts/RefContext';

import './EditorTile.css';

function EditorTile(props) {
  const iFrameRef = useRefContext();
  const [ref, setRef] = useState(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [xAxis, setXAxis] = useState(0);

  useEffect(() => {
    setRef(iFrameRef);
  }, [iFrameRef]);

  useEffect(() => {
    if (x == 0 || y == 0 || !ref) return;
    ref.current.contentWindow.postMessage(JSON.stringify({ type: props.label, x: x, y: y }), '*');
    console.log(x, y);
    setX(0);
    setY(0);
  }, [x, y]);

  const handleDragStart = (event) => {
    // This method runs when the dragging starts
    console.log('Started');
  };
  const handleDrag = (event) => {
    setXAxis(event.clientX);
  };
  const handleDragEnd = (event) => {
    setX(event.clientX);
    setY(event.clientY);
    setXAxis(0);
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
