import './EditorContainer.css';
import useModeContext from '../../contexts/ModeContext';
import EditorTile from './editorTile/EditorTile';
import svgData from '../../data/SvgData';

function EditorContainer() {
  const { isEdit } = useModeContext();
  const editorTiles = svgData.map((svg) => {
    return <EditorTile key={svg.id} label={svg.label} svgPath={svg.svgPath} fill={svg.fill} />;
  });
  return (
    <div className={isEdit ? 'editor-container' : 'editor-container--preview'}>
      <div className={'editor-grid'}>{editorTiles}</div>
    </div>
  );
}

export default EditorContainer;
