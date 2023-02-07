import { useRefContext } from '../../contexts/RefContext';
import './CustomContainer.css';

function CustomContainer() {
  const iFrameRef = useRefContext();
  return (
    <div className="customize--container">
      <iframe
        ref={iFrameRef}
        src="/customApp/"
        width="100%"
        height="100%"
        title="Custom App"></iframe>
    </div>
  );
}

export default CustomContainer;
