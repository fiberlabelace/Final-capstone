import { createContext, useContext, useState } from "react";
const ThemeContext = createContext();
export const Theme = ({
  children
}) => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };
  return <ThemeContext.Provider value={{
    darkMode,
    toggleTheme
  }}>
            <div className={darkMode ? "dark-mode" : "light-mode"}>
                {children}
            </div>
        </ThemeContext.Provider>;
};
export const useTheme = () => useContext(ThemeContext);