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
import { toast } from "react-hot-toast";

export default function Registration() {
  const [email, setEmail] = useState("");

  let navigate = useNavigate();

  const handleOnChange = (event) => {
    let email = event.target.value;
    setEmail(email);
    localStorage.setItem("email", email);
  };

  const handleSubmit = () => {
    localStorage.setItem("previousPage", "registration");
    navigate("/verify-member");
    // axios
    //   .post("/NewMember/sendmail", { studentEmail: email })
    //   .then((res) => {
    //     localStorage.setItem("previousPage", "registration");
    //     navigate("/verify-member");
    //   })
    //   .catch((err) => {
    //     toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    //   });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
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
              <Typography variant="h3">สมัครสมาชิก</Typography>
            </Stack>
            <TextField
              variant="outlined"
              placeholder="อีเมลจุฬาลงกรณ์มหาวิทยาลัย"
              label="อีเมลจุฬาลงกรณ์มหาวิทยาลัย"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleOnChange}
              onKeyPress={handleKeyPress}
            />
            <Button variant="contained" onClick={handleSubmit}>
              ดำเนินการต่อ
            </Button>
            <Button variant="text" onClick={() => navigate("/sign-in")}>
              มีบัญชีแล้วใช่หรือไม่
            </Button>
          </Stack>
        </Paper>
      </Stack>
      <Footer />
    </Stack>
  );
}
