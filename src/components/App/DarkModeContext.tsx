import React, { createContext, useContext, useState } from 'react';

const DarkModeContext = createContext({
  isDarkMode: false,
  setIsDarkMode: (isDarkMode: boolean) => {},
});

interface DarkModeProviderProps {
  children: React.ReactNode;
}

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
