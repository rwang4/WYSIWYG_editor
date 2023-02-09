import useRefContext from '../../contexts/RefContext';
import './CustomContainer.css';
/**
 * custom container with inline frame to embed Custom App document within the current HTML document**
 */
function CustomContainer() {
  const iFrameRef = useRefContext();

  return (
    <div className={'custom-container'}>
      <iframe key="/customApp" ref={iFrameRef} src="/customApp" width="100%" height="100%"></iframe>
    </div>
  );
}

export default CustomContainer;
