import { createContext, useState, useContext } from 'react';

const ModeContext = createContext();

export const ModeProvider = (props) => {
  const [isEdit, setMode] = useState(true);
  function changeMode() {
    setMode(!isEdit);
  }
  return (
    <ModeContext.Provider value={{ isEdit, changeMode }}>{props.children}</ModeContext.Provider>
  );
};

const useModeContext = () => useContext(ModeContext);
export default useModeContext;
