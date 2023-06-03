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
import { getStatus } from "../middleware/Auth";

export default function VerifyMember() {
  const [password, setPassword] = useState("");
  const email = localStorage.getItem("email");
  const previousPage = localStorage.getItem("previousPage");
  const [nextPage, setNextPage] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (previousPage == "") {
      navigate("/");
    } else if (previousPage == "forget-password") {
      setNextPage("main");
    } else if (previousPage == "registration") {
      setNextPage("personal-info");
      localStorage.setItem("role", "student");
    }
  }, [previousPage]);

  const handleClickPrevious = () => {
    navigate(`/${previousPage}`);
    localStorage.removeItem("previousPage");
  };

  const handleSubmit = () => {
    if (previousPage == "forget-password") {
      toast.promise(
        axios.post("/tokens", { userId: email, password: password }),
        {
          loading: "กำลังดำเนินการ...",
          success: (response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem(
              "username",
              response.data.firstname + " " + response.data.lastname
            );
            navigate(`/${nextPage}`);
            localStorage.removeItem("previousPage");
            return "เปลี่ยนรหัสผ่านสำเร็จ";
          },
          error: (err) => {
            if (getStatus(err) == "401") {
              return "รหัสผ่านไม่ถูกต้อง";
            } else {
              return "เกิดข้อผิดพลาด กรุณาลองใหม่";
            }
          },
        }
      );
    } else if (previousPage == "registration") {
      toast.promise(
        axios.post("/tokens", { userId: email, password: password }),
        {
          loading: "กำลังดำเนินการ...",
          success: (response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("studentId", response.data.studentId);
            localStorage.setItem(
              "username",
              response.data.firstname + " " + response.data.lastname
            );
            navigate(`/${nextPage}`);
            localStorage.removeItem("previousPage");
            return "สมัครสมาชิกสำเร็จ";
          },
          error: (err) => {
            if (getStatus(err) == "401") {
              console.log("got 401")
              return "รหัสผ่านไม่ถูกต้อง";
            } else {
              return "เกิดข้อผิดพลาด กรุณาลองใหม่";
            }
          },
        }
      );
    }
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
    //       navigate(`/${nextPage}`);
    //       if (previousPage == "forget-password") {
    //         localStorage.removeItem("previousPage");
    //         return "เปลี่ยนรหัสผ่านสำเร็จ";
    //       } else if (previousPage == "registration") {
    //         localStorage.removeItem("previousPage");
    //         return "สมัครสมาชิกสำเร็จ";
    //       }
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
          sx={{ opacity: 0.75, p: 48, width: 400, borderRadius: 3 }}
        >
          <Stack maxWidth="360px" m="auto" spacing={16}>
            <Stack alignItems="center" spacing={16}>
              <Typography variant="h3">ยืนยันตัวตน</Typography>
              <Avatar
                src="https://cache111.com/upload/seniorproject/images/Email.png"
                sx={{ width: 150, height: 150 }}
              />
            </Stack>
            <Typography variant="body2">
              ทางระบบได้ส่งรหัสผ่าน 8 หลักไปยัง
            </Typography>
            <Typography variant="body2" color="#0099FF">
              {email}
            </Typography>
            <Typography variant="body2">
              กรุณากรอกรหัสผ่านดังกล่าว เพื่อยืนยันตัวตน
            </Typography>
            {/* <Stack alignItems="center">
              <Countdown date={Date.now() + timer} renderer={renderer} />
            </Stack> */}

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
