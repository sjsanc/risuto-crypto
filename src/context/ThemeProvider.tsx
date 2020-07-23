import React, { createContext, useState } from "react";

export type Theme = "primary" | "secondary";
type Palette = { color: string; backgroundColor: string };
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("primary");
  const toggleTheme = () => {
    setTheme(theme === "primary" ? "secondary" : "primary");
  };

  const color = theme === "primary" ? "#333" : "#FFF";
  const backgroundColor = theme === "primary" ? "#FFF" : "#333";

  document.body.style.color = color;
  document.body.style.backgroundColor = backgroundColor;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
