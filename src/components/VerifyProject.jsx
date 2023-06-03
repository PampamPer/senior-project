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
import { clearStorage } from "../middleware/Auth";

export default function VerifyProject() {
  const email = localStorage.getItem("email");
  const advisor1 = localStorage.getItem("advisor1");
  const advisor2 = localStorage.getItem("advisor2");
  const regProcess = localStorage.getItem("regProcess");

  let navigate = useNavigate();

  if (!regProcess) {
    clearStorage();
  }

  // const handleSubmit = () => {
  //   // toast.promise(
  //   //   axios.post("/tokens", { userId: email, password: password }),
  //   //   {
  //   //     loading: "กำลังดำเนินการ...",
  //   //     success: () => {
  //   //       localStorage.setItem("token", response.data.token);
  //   //       localStorage.setItem("studentId", response.data.studentId);
  //   //       localStorage.setItem(
  //   //         "username",
  //   //         response.data.firstname + " " + response.data.lastname
  //   //       );
  //   //       localStorage.removeItem("previousPage");
  //   //       navigate(`/${nextPage}`);
  //   //       return "เปลี่ยนรหัสผ่านสำเร็จ";
  //   //     },
  //   //     error: () => {
  //   //       return "เกิดข้อผิดพลาด กรุณาลองใหม่";
  //   //     },
  //   //   }
  //   // );
  // };

  const handleClick = () => {
    localStorage.removeItem("address");
    localStorage.removeItem("keyword");
    localStorage.removeItem("hint");
    localStorage.removeItem("phone");
    localStorage.removeItem("previousPage");
    localStorage.removeItem("major");
    localStorage.removeItem("projTh");
    localStorage.removeItem("projEn");
    localStorage.removeItem("student2");
    localStorage.removeItem("student3");
    localStorage.removeItem("advisor1");
    localStorage.removeItem("advisor2");
    localStorage.removeItem("regProcess");

    navigate("/main");
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
          <Stack maxWidth="360px" m="auto" spacing={24}>
            <Stack alignItems="center" spacing={16}>
              <Stack spacing={8} alignItems="center">
                <Typography variant="h3">ยืนยัน</Typography>
                <Typography variant="h3">ข้อมูลโครงงาน</Typography>
              </Stack>
              <Avatar
                src="https://cache111.com/upload/seniorproject/images/Email.png"
                sx={{ width: 150, height: 150 }}
              />
            </Stack>
            <Typography variant="body2">
              ทางระบบได้ส่งการแจ้งเตือนไปยังอีเมลของ
            </Typography>
            <Typography variant="body2" color="#0099FF">
              {advisor1}
            </Typography>
            <div>
              {advisor2 != null && (
                <Typography variant="body2" color="#0099FF">
                  {advisor2}
                </Typography>
              )}
            </div>
            <Typography variant="body2">
              เพื่อตรวจสอบความถูกต้องของข้อมูล
              กรุณาตรวจสอบผลลัพธ์อีกครั้งในภายหลัง
            </Typography>
            <Stack alignItems="end">
              <Button
                variant="contained"
                sx={{ width: 85 }}
                onClick={handleClick}
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
