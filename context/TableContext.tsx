import React, { FunctionComponent } from 'react';
import { createContext } from 'vm';

const TableContext = createContext();

const Provider: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  return <TableContext.Provider value={{}}>{children}</TableContext.Provider>;
};

export { Provider };

export default TableContext;
