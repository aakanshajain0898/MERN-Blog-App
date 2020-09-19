import React, { createContext,useState } from 'react';

export const themes = {
  light: { foreground: '#000000', background: '#eeeeee' },
  dark: { foreground: '#ffffff', background: '#222222' },
};

// default value
const initialState = { theme: themes.light, toggleTheme: () => {} };

export const ThemeContext = createContext(initialState);

const ThemeState = (props) => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme((prevState) =>
      prevState === themes.dark ? themes.light : themes.dark
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;
