import { useContext, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { Typography, Paper, Snackbar, Stack } from "@mui/material";
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

  useEffect(()=>{
    if(isLogged) {
      navigate('/main')
    }
  }, [])

  const Login = () => {
    axios
      .post(
        "/tokens",
        { userId: userId, password: password }

      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem(
          "username",
          response.data.firstname + " " + response.data.lastname
        );
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
      <Stack gap={120} className="content">
      <NavBar />
      {/* {toggle} */}
      
      <Stack alignItems="center">
      <Paper elevation={4} sx={{opacity:0.75, p:48, width: 360, borderRadius:3}}>
      <Stack maxWidth="360px" m="auto" spacing={16}>
        <TextField
          variant="outlined"
          placeholder="อีเมล"
          label="อีเมล"
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
      </Stack></Paper></Stack>
      <Footer /></Stack>
  );
}

export default App;
