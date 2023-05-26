import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { Typography, Paper, Snackbar, Stack, Avatar } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Countdown from "react-countdown";

export default function VerifyProject() {
  const [password, setPassword] = useState("");
  const email = localStorage.getItem("email");
  const [timer, setTimer] = useState(60000);
  const renderer = ({ minutes, seconds }) => {
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return (
      <span style={{ color: "#4caf50" }}>
        {formattedMinutes}:{formattedSeconds}
      </span>
    );
  };

  let navigate = useNavigate();

  const handleSubmit = () => {
    // toast.promise(
    //   axios.post("/tokens", { userId: email, password: password }),
    //   {
    //     loading: "กำลังดำเนินการ...",
    //     success: () => {
    //       localStorage.setItem("token", response.data.token);
    //       localStorage.setItem("studentId", response.data.studentId);
    //       localStorage.setItem(
    //         "username",
    //         response.data.firstname + " " + response.data.lastname
    //       );
    //       localStorage.removeItem("previousPage");
    //       navigate(`/${nextPage}`);
    //       return "เปลี่ยนรหัสผ่านสำเร็จ";
    //     },
    //     error: () => {
    //       return "เกิดข้อผิดพลาด กรุณาลองใหม่";
    //     },
    //   }
    // );
  };

  const resendEmail = () => {
    toast.promise(
      axios.put("/NewMember/sendMailAgain", { studentEmail: email }),
      {
        loading: "กำลังดำเนินการ...",
        success: () => {
          setTimer(60000);
          return "ส่งรหัสผ่านใหม่ไปยังอีเมลสำเร็จ";
        },
        error: () => {
          return "ไม่สามารถขอรหัสผ่านใหม่ได้";
        },
      }
    );
  };

  return (
    <Stack gap={96} className="content">
      <NavBar />
      {/* {toggle} */}

      <Stack alignItems="center">
        <Paper
          elevation={4}
          sx={{ opacity: 0.75, p: 48, width: 500, borderRadius: 3 }}
        >
          <Stack maxWidth="360px" m="auto" spacing={16}>
            <Stack alignItems="center" spacing={16}>
              <Typography variant="h3">ยืนยันข้อมูลโครงงาน</Typography>
              <Avatar
                src="../../dist/assets/Email.png"
                sx={{ width: 150, height: 150 }}
              />
            </Stack>
            <Typography variant="body2">
              ทางระบบได้ส่งการแจ้งเตือนไปยังอีเมลของ
              <Typography variant="body2" color="#0099FF">
                {advisor1}
              </Typography>
              {advisor2 != null && (
                <Typography variant="body2" color="#0099FF">
                  {advisor2}
                </Typography>
              )}
              เพื่อตรวจสอบความถูกต้องของข้อมูล กรุณาตรวจสอบผลลัพธ์อีกครั้งในภายหลัง
            </Typography>
            <Stack alignItems="center">
              <Countdown date={Date.now() + timer} renderer={renderer} />
            </Stack>

            <Stack spacing={0}>
              <TextField
                variant="outlined"
                placeholder="รหัสผ่านยืนยันตัวตน"
                //   label="รหัสผ่านยืนยันตัวตน"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button variant="text" onClick={resendEmail}>
                ต้องการขอรหัสผ่านใหม่?
              </Button>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Button
                variant="outlined"
                sx={{ width: 85 }}
                onClick={handleClickPrevious}
              >
                ย้อนกลับ
              </Button>
              <Button
                variant="contained"
                sx={{ width: 85 }}
                onClick={handleSubmit}
              >
                ยืนยัน
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
      <Footer />
    </Stack>
  );
}
