import { useState, useEffect, createContext } from "react";
import "./App.css";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import { Routes, Route } from "react-router-dom";

import SignIn from "./components/SignIn";
import Main from "./components/MainBeforeLogin";
import MainStudent from "./components/MainAfterStudent";

export const ToggleContext = createContext();

function App() {
  axios.defaults.baseURL = "https://cache111.com/seniorprojectapi";
  const [toggle, setToggle] = useState( localStorage.getItem('projectPath')? localStorage.getItem('projectPath')==='project' : true);
  const [semesterId, setSemesterId] = useState(localStorage.getItem('semesterId') || 2);
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          text: {
            color: "#0075FF",
          },
          contained: {
            background: "#0075FF",
            ":hover": {
              background: "#234FBB",
            },
            color: "#fff",
          },
          outlined: {
            borderColor: "#0075FF",
            color: "#0075FF",
            ":hover": {
              borderColor: "#0075FF",
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h3: {
            color: "#243460",
          },
          h4: {
            color: "#234FBB",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: "#fff",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fill: "#0075FF",
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            justifyContent: "space-between",
            paddingInline: 16,
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          outlined: {
            background: "#fff",
            padding: 8,
          },
        },
      }, // 
      // MuiSwitch: {
      //   styleOverrides: {
      //     root: {
      //       width: 42,
      //       height: 26,
      //       padding: 0,
      //       borderRadius: 16,
      //     },
      //     switchBase: {
      //       padding: 0,
      //       margin: 3,
      //     }
      //   }
      // }
    },
    palette: {
      primary: {
        main: "#616777",
        //light: "#00EB09"
      },
      secondary: {
        main: "#0075FF",
      },
    },
    typography: {
      fontFamily: "Kanit",
      allVariants: {
        color: "#616777",
      },
    },
    spacing: 1,
  });

  return (
    <ThemeProvider theme={theme}>
      <ToggleContext.Provider value={{ toggle, setToggle, semesterId, setSemesterId }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/main-student" element={<MainStudent />} />
        </Routes>
      </ToggleContext.Provider>
    </ThemeProvider>
  );
}

export default App;
