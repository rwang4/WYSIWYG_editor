import useRefContext from '../../contexts/RefContext';
import useModeContext from '../../contexts/ModeContext';
import './CustomContainer.css';

function CustomContainer() {
  const { isEdit } = useModeContext();
  const iFrameRef = useRefContext();

  return (
    <div className={isEdit ? 'custom-container' : 'custom-container preview'}>
      <iframe key="/customApp" ref={iFrameRef} src="/customApp" width="100%" height="100%"></iframe>
    </div>
  );
}

export default CustomContainer;
