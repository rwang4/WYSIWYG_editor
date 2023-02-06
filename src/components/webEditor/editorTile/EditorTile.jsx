import './EditorTile.css';

function EditorTile(props) {
  return (
    <div className="editor-tile" title="Text" draggable="true">
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
