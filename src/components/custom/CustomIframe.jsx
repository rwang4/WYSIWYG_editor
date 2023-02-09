import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useRefContext from '../../contexts/RefContext';

/**
 * custom iframe element with Custom App Component as window
 * substitute by react-route-dom package (NOT USED)**
 */

const CustomIframe = ({ children, ...props }) => {
  const iFrameRef = useRefContext();
  const [ref, setRef] = useState(null);

  const mountNode = ref?.contentWindow?.document?.body;
  useEffect(() => {
    if (!ref) return;
    iFrameRef.current = ref;
  }, [ref]);

  return (
    <iframe {...props} ref={setRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

export default CustomIframe;
