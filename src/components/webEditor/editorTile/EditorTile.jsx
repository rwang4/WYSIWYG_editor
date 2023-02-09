import { useState, useEffect } from 'react';
import useRefContext from '../../../contexts/RefContext';
import './EditorTile.css';

/**
 * Drag and Drop Editor Tile
 * Create a new component in Custom App when tile is dragged and dropped at a new X,Y position**
 */

function EditorTile(props) {
  const iFrameRef = useRefContext();
  const [ref, setRef] = useState(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    setRef(iFrameRef);
  }, [iFrameRef]);

  // pass X,Y position data to Custom App Window to create new component in it
  useEffect(() => {
    if (x == 0 || y == 0 || !ref) return;
    ref?.current?.contentWindow.postMessage(JSON.stringify({ type: props.label, x: x, y: y }), '*');
    setX(0);
    setY(0);
  }, [x, y]);

  const handleDragEnd = (event) => {
    setX(event.clientX);
    setY(event.clientY);
  };

  return (
    <div className="editor-tile" title="Text" draggable onDragEnd={handleDragEnd}>
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
