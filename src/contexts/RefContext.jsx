import { createContext, createRef, useContext } from 'react';

const RefContext = createContext();
const iFrameRef = createRef();

export const RefProvider = (props) => {
  return <RefContext.Provider value={iFrameRef}>{props.children}</RefContext.Provider>;
};

export const useRefContext = () => useContext(RefContext);
