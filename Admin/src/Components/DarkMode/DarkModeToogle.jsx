import React, { useContext } from "react";
import { IconButton ,useTheme} from "@mui/material";
import { ThemeContext } from "../../Context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const DarkModeToggle = () => {
  const theme = useTheme();
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <IconButton onClick={() => setDarkMode((prev) => !prev)}  sx={{marginRight:'20px',color:theme.palette.text.primary}}>
      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default DarkModeToggle;
