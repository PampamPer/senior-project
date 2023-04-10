import { useContext, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { IconButton, Snackbar, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PWTextField from "./PasswordTextField";

function App() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["toggle", "role", "token"]);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [level, setLevel] = useState("info");
  const [mesg, setMesg] = useState("");
  const [open, setOpen] = useState(false);
  const { isLogged, setIsLogged } = useContext(AppContext);

  let navigate = useNavigate();

  const Login = () => {
    axios
      .post(
        "/tokens",
        { userId: userId, password: password }
        // {
        //   headers: {
        //     /* Authorization: 'Bearer ' + token */
        //   },
        //   timeout: 5 * 1000,
        // }
      )
      .then((response) => {
        // setCookie("token", response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem(
          "username",
          response.data.firstname + " " + response.data.lastname
        );
        // localStorage.setItem("pic", response.data.profilePicture==''? "https://www.clipartmax.com/png/middle/434-4349876_profile-icon-vector-png.png": response.data.profilePicture);
        // localStorage.setItem("pic", response.data.profilePicture==''? "AccountCircle": response.data.profilePicture);
        setIsLogged(true);
        navigate("/main");
        console.log();
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          setLevel("error");
          setMesg("Timeout");
          setOpen(true);
        } else {
          setLevel("warning");
          setMesg(error.response.status + " " + error.response.statusText);
          setOpen(true);
        }
      });
  };

  return (
    <div className="App">
      <NavBar />
      {/* {toggle} */}
      <Stack maxWidth="360px" m="auto" spacing={16}>
        <TextField
          variant="outlined"
          placeholder="Enter your email"
          label="email"
          //onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
          onChange={(event) => setUserId(event.target.value)}
        />
        <PWTextField
          setPassword={setPassword}
          label={"รหัสผ่าน"}
          placeholder={"รหัสผ่าน"}
        />

        <Button variant="contained" onClick={Login}>
          login
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={level}>{mesg}</Alert>
        </Snackbar>
      </Stack>
      <Footer />
    </div>
  );
}

export default App;
