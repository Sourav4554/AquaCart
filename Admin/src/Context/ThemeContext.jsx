import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createContext, useState, useMemo } from "react";

// Create a context
export const ThemeContext = createContext();

const ThemeProviderWrapper = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Memoize the theme for performance
  const theme = useMemo(() =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
