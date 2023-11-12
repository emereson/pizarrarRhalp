import React, { useContext, useState } from 'react';

export const schemeContext = React.createContext('dark');

export const ColorSchemeProvider = ({ children }) => {
  const [CurrentColor, setCurrentColor] = useState('dark');

  return (
    <schemeContext.Provider value={{ CurrentColor, setCurrentColor }}>
      {children}
    </schemeContext.Provider>
  );
};

export const useColorScheme = () => {
  const { CurrentColor, setCurrentColor } = useContext(schemeContext);
  if (CurrentColor === undefined) {
    throw new Error('useColorScheme is only avaiable in ColorSchemeContext');
  }
  return { CurrentColor, setCurrentColor };
};
