/**
 * This is a global context to store a reference of DOM Element - Custom App**
 */
import { createContext, createRef, useContext } from 'react';

const RefContext = createContext();
const iFrameRef = createRef();

export const RefProvider = (props) => {
  return <RefContext.Provider value={iFrameRef}>{props.children}</RefContext.Provider>;
};

const useRefContext = () => useContext(RefContext);
export default useRefContext;
