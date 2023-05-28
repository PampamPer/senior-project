import { useContext, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { Typography, Paper, Snackbar, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import PWTextField from "./PasswordTextField";
import { toast } from "react-hot-toast";
import { getStatus } from "../middleware/Auth";

function App() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("info");
  const [mesg, setMesg] = useState("");
  const [open, setOpen] = useState(false);

  let navigate = useNavigate();

  const Login = () => {
    if (userId == "" || password == "") {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else {
      toast.promise(
        axios.post("/tokens", { userId: userId, password: password }),
        {
          loading: "กำลังเข้าสู่ระบบ...",
          success: (response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem(
              "username",
              response.data.firstname + " " + response.data.lastname
            );
            navigate("/main");
            return "เข้าสู่ระบบสำเร็จ";
          },
          error: (err) => {
            if (getStatus(err) == "401") {
              return "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
            } else if (getStatus(err) == "403") {
              return "ไม่พบบัญชีนี้ในระบบ";
            }else {
              return "เกิดข้อผิดพลาด กรุณาลองใหม่";
            }
          },
        }
      );
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      Login();
    }
  };

  return (
    <Stack gap={96} className="content">
      <NavBar />
      {/* {toggle} */}

      <Stack alignItems="center">
        <Paper
          elevation={4}
          sx={{ opacity: 0.75, p: 48, width: 400, borderRadius: 3 }}
        >
          <Stack maxWidth="360px" m="auto" spacing={16}>
            <Stack alignItems="center">
              <Typography variant="h3">เข้าสู่ระบบ</Typography>
            </Stack>
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
              onKeyPress={handleKeyPress}
            />
            <PWTextField
              setPassword={setPassword}
              label={"รหัสผ่าน"}
              placeholder={"รหัสผ่าน"}
              handleKeyPress={handleKeyPress}
            />
            <Stack alignItems="end">
              <Button
                variant="text"
                onClick={() => navigate("/forget-password")}
              >
                ลืมรหัสผ่าน?
              </Button>
            </Stack>
            <Button variant="contained" onClick={Login}>
              login
            </Button>
            <Button variant="text" onClick={() => navigate("/registration")}>
              ยังไม่มีบัญชีใช่หรือไม่
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
        </Paper>
      </Stack>
      <Footer />
    </Stack>
  );
}

export default App;
