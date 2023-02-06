import './EditorTile.css';
import TitleIcon from '@mui/icons-material/Title';

function EditorTile(props) {
  return (
    <div className="tile--block">
      <div className="tile--media">
        <TitleIcon />
      </div>
      <div className="tile--label">Text</div>
    </div>
  );
}

export default EditorTile;
