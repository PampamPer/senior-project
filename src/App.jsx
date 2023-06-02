import { useState, useEffect, createContext, useContext } from "react";
import "./App.css";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Main from "./components/Main";
import Faq from "./components/FAQ";
import DownloadFiles from "./components/DownloadFiles";
import ProjectInfo from "./components/ProjectInfo";
import Profile from "./components/Profile";
import SummaryTable from "./components/SummaryTable";
import Auth from "./middleware/Auth";
import ForgetPassword from "./components/ForgetPassword";
import VerifyMember from "./components/VerifyMember";
import Registration from "./components/Registration";
import { Toaster, toast } from "react-hot-toast";
import PersonalInfo from "./components/PersonalInfo";
import CreateProject from "./components/CreateProject";
import VerifyProject from "./components/VerifyProject";
import RegProcess from "./middleware/RegProcess";

export const AppContext = createContext();

async function setDefault() {
  const getDefault = await axios.get("/semesters/getCurrent");
  return {
    toggle: getDefault?.data.toggle,
    semesterId: getDefault?.data.semesterId,
    path: getDefault?.data.mode,
  };
}

function App() {
  axios.defaults.baseURL = "https://acadproj1.sc.chula.ac.th/seniorprojectapi";
  // axios.defaults.baseURL = "https://cache111.com/seniorprojectapi";

  const [toggle, setToggle] = useState(
    localStorage.getItem("projectPath")
      ? localStorage.getItem("projectPath") === "project"
      : false
  );
  const [semesterId, setSemesterId] = useState(
    localStorage.getItem("semesterId") || 1
  );

  localStorage.setItem("previousPage", "");

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
          subtitle1: {
            color: "#234FBB",
            fontWeight: 600,
          },
          subtitle2: {
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
          root: {},
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            ":disabled": {
              color: "#CCCCCC",
            },
            color: "#0075FF",
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
            p: 8,
          },
        },
      },
      //
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
        // main: "#fff",
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
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    spacing: 1,
  });

  const setDefaultVal = async () => {
    const defaultVal = await setDefault();
    if(!localStorage.getItem("projectPath")){
      setToggle(defaultVal.toggle)
      localStorage.setItem("projectPath",defaultVal.path)
    }
    if(!localStorage.getItem("semesterId")){
      setSemesterId(defaultVal.semesterId)
    }
  };

  useEffect(() => {
    setDefaultVal();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          toggle,
          setToggle,
          semesterId,
          setSemesterId,
        }}
      >
        <Toaster position="bottom-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/download-files" element={<DownloadFiles />} />
          <Route
            path="/project-info"
            element={
              <Auth>
                <ProjectInfo />
              </Auth>
            }
          />
          <Route
            path="/profile"
            element={
              <Auth>
                <Profile />
              </Auth>
            }
          />
          <Route path="/summary-table" element={<SummaryTable />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/verify-member" element={<VerifyMember />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/personal-info"
            element={
              <RegProcess>
                {" "}
                <PersonalInfo />
              </RegProcess>
            }
          />
          <Route
            path="/create-project"
            element={
              <RegProcess>
                <CreateProject />
              </RegProcess>
            }
          />
          <Route
            path="/verify-project"
            element={
              <RegProcess>
                <VerifyProject />
              </RegProcess>
            }
          />
        </Routes>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
