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
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PWTextField from "./PasswordTextField";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [hint, setHint] = useState("");
  const [cookies, setCookie] = useCookies(["toggle", "role", "token"]);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [level, setLevel] = useState("info");
  const [mesg, setMesg] = useState("");
  const [open, setOpen] = useState(false);
  const { isLogged, setIsLogged } = useContext(AppContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/main");
    }
  }, []);

  const checkHint = () => {
    axios
      .get("/PersonalInfo/getHint")
      .then((res) => {
        setLoading(false);
        setHint(res.data);
        console.log(res.data)
        // if (res.data == "") {
        //   forgetPW();
        // }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };

  const forgetPW = () => {
    axios
      .put("/PersonalInfo/forgetPassword", { email: email })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem(
          "username",
          response.data.firstname + " " + response.data.lastname
        );
        navigate("/verify-member");
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      checkHint();
    }
  };

  return (
    <Stack gap={120} className="content">
      <NavBar />
      {/* {toggle} */}

      <Stack alignItems="center">
        <Paper
          elevation={4}
          sx={{ opacity: 0.75, p: 48, width: 400, borderRadius: 3 }}
        >
          <Stack maxWidth="360px" m="auto" spacing={16}>
            <Stack alignItems="center">
              <Typography variant="h3">ลืมรหัสผ่าน</Typography>
            </Stack>
            <TextField
              variant="outlined"
              placeholder="อีเมลที่ใช้ลงทะเบียน"
              label="อีเมลที่ใช้ลงทะเบียน"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => setEmail(event.target.value)}
              onKeyPress={handleKeyPress}
            />
            <TextField
              variant="outlined"
              placeholder="คีย์เวิร์ดยืนยันตัวตน"
              label="คีย์เวิร์ดยืนยันตัวตน"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => setEmail(event.target.value)}
              onKeyPress={handleKeyPress}
            />

            <Button variant="contained" onClick={checkHint}>
              ขอรหัสผ่านทางอีเมล
            </Button>
            <Stack alignItems="center">
              {hint != "" && (
                <Typography variant="body2" color="red">
                  คำใบ้: {hint}
                </Typography>
              )}
            </Stack>
            <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={() => setOpen(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert severity={level}>{mesg}</Alert>
            </Snackbar>
          </Stack>
        </Paper>
      </Stack>
      <Footer />
    </Stack>
  );
}
