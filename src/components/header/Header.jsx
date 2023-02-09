/**
 * Header Component with ChangeMode Button and Preview Button**
 */
import { useState } from 'react';
import './Header.css';
import useModeContext from '../../contexts/ModeContext';
import { ToggleButton } from '@mui/material';
import { styled } from '@mui/system';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import CodeIcon from '@mui/icons-material/Code';
import useRefContext from '../../contexts/RefContext';

const StyledToggleButton = styled(ToggleButton)(({ hovercolor }) => ({
  '&.Mui-selected:hover, &.MuiToggleButton-root:hover': {
    borderRadius: '40px',
    backgroundColor: hovercolor
  },
  '&.Mui-selected, &.MuiToggleButton-root': {
    borderRadius: '40px'
  }
}));
function Header({ handleClickOpen }) {
  const { isEdit } = useModeContext();
  const iFrameRef = useRefContext();

  const [isChecked, setChecked] = useState(isEdit);
  const modeContext = useModeContext();

  return (
    <div className="header">
      <h1>WYSIWYG Editor</h1>
      <div className="nav-btns">
        <div className="btn-container mode">
          <span>{isChecked ? 'Preview' : 'Edit'}</span>
          <StyledToggleButton
            value={isChecked ? 'preview' : 'edit'}
            selected={isChecked}
            onChange={() => {
              // Pass 'modeChange' data to Custom App Window
              modeContext.changeMode();
              setChecked(!isChecked);
              iFrameRef?.current?.contentWindow.postMessage('modeChange', '*');
            }}
            hovercolor="#13152e">
            {isChecked ? <PreviewIcon color="secondary" /> : <EditIcon color="secondary" />}
          </StyledToggleButton>
        </div>
        <div className="btn-container code">
          <span>Export</span>
          <StyledToggleButton
            value={'code'}
            disabled={isEdit}
            onChange={handleClickOpen}
            hovercolor="#13152e">
            <CodeIcon color="secondary" />
          </StyledToggleButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
