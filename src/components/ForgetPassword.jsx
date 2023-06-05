import { useContext, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { Typography, Paper, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getStatus } from "../middleware/Auth";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [hint, setHint] = useState("");
  const [keyword, setKeyword] = useState("");

  let navigate = useNavigate();

  const handleOnChange = (event) => {
    let email = event.target.value;
    setEmail(email);
    localStorage.setItem("email", email);
  };

  const handleClick = () => {
    localStorage.setItem("previousPage", "forget-password");
    navigate("/verify-member");
  };

  const checkHint = () => {
    if (email == "" || keyword == "") {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else {
      axios
        .post("/PersonalInfo/getHint", { email: email, keyword: keyword })
        .then((res) => {
          let hint = res.data.hint;
          if (hint == "" || hint == null) {
            forgetPW();
          } else {
            setHint(hint);
            toast.error("คีย์เวิร์ดไม่ถูกต้อง กรุณาลองใหม่");
          }
        })
        .catch((err) => {
          if (getStatus(err) == "403") {
            toast.error("ไม่พบบัญชีนี้ในระบบ");
          } else {
            toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
          }
        });
    }
  };

  const forgetPW = () => {
    toast.promise(
      axios.put("/PersonalInfo/forgetPassword", {
        email: email,
        keyword: keyword,
      }),
      {
        loading: "กำลังดำเนินการ...",
        success: () => {
          localStorage.setItem("previousPage", "forget-password");
          navigate("/verify-member");
          return "ส่งรหัสผ่านไปยังอีเมลสำเร็จ";
        },
        error: () => {
          if (getStatus(err) == "403") {
            return "ไม่พบบัญชีนี้ในระบบ";
          } else {
            return "เกิดข้อผิดพลาด กรุณาลองใหม่";
          }
        },
      }
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      checkHint();
    }
  };

  // if (loading) {
  //   return <p>loading...</p>;
  // }

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
              onChange={(event) => handleOnChange(event)}
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
              onChange={(event) => setKeyword(event.target.value)}
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
          </Stack>
        </Paper>
      </Stack>
      <Footer />
    </Stack>
  );
}
