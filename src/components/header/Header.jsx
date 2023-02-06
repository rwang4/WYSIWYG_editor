import { useState, useContext } from 'react';
import './Header.css';
import ModeContext from '../../ModeContext';
import { ToggleButton } from '@mui/material';
import { styled } from '@mui/system';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import CodeIcon from '@mui/icons-material/Code';

const StyledToggleButton = styled(ToggleButton)(({ hovercolor }) => ({
  '&.Mui-selected:hover, &.MuiToggleButton-root:hover': {
    borderRadius: '40px',
    backgroundColor: hovercolor
  },
  '&.Mui-selected, &.MuiToggleButton-root': {
    borderRadius: '40px'
  }
}));
function Header() {
  const { isEdit } = useContext(ModeContext);
  const [isChecked, setChecked] = useState(isEdit);
  const modeContext = useContext(ModeContext);
  return (
    <div className="header">
      <h1>WYSIWYG Editor</h1>
      <div className="nav-btns">
        <div className="btn-container mode">
          <span>{isChecked ? 'Preview Mode' : 'Edit Mode'}</span>
          <StyledToggleButton
            value={isChecked ? 'preview' : 'edit'}
            selected={isChecked}
            onChange={() => {
              modeContext.changeMode();
              setChecked(!isChecked);
            }}
            hovercolor="#13152e">
            {isChecked ? <PreviewIcon color="secondary" /> : <EditIcon color="secondary" />}
          </StyledToggleButton>
        </div>
        <div className="btn-container code">
          <span>Export</span>
          <StyledToggleButton value={'code'} onChange={() => {}} hoverColor="#13152e">
            <CodeIcon color="secondary" />
          </StyledToggleButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
