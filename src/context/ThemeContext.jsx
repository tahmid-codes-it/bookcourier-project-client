import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    if (dark) {
      html.classList.add("dark");        // Tailwind dark mode
      html.setAttribute("data-theme", "dark"); // DaisyUI dark theme
    } else {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
    }
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
