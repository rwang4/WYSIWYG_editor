import { useState, useContext } from 'react';
import './EditorContainer.css';
import ModeContext from '../../ModeContext';
import EditorTile from './editorTile/EditorTile';

function EditorContainer() {
  const { isEdit } = useContext(ModeContext);
  return (
    <div className={isEdit ? 'editor-container' : 'editor-container--preview'}>
      <EditorTile />
    </div>
  );
}

export default EditorContainer;
