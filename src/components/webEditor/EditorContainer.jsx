import { useState, useContext } from 'react';
import './EditorContainer.css';
import ModeContext from '../../ModeContext';
import EditorTile from './editorTile/EditorTile';
import svgData from '../../data/SvgData';

function EditorContainer() {
  const { isEdit } = useContext(ModeContext);
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
