import { useContext, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { Typography, Paper, Snackbar, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { toast } from "react-hot-toast";
import { clearStorage } from "../middleware/Auth";

export default function PersonalInfo() {
  const studentId = localStorage.getItem("studentId");
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [hint, setHint] = useState("");
  const [keyword, setKeyword] = useState("");
  const { semesterId } = useContext(AppContext);
  const regProcess = localStorage.getItem("regProcess")
  let navigate = useNavigate();  

  const storeData = () => {
    localStorage.setItem("address", address)
    localStorage.setItem("keyword", keyword)
    localStorage.setItem("hint", hint)
    localStorage.setItem("phone", phone)
  }

  if(!regProcess){
    clearStorage()
  } else if (localStorage.getItem("address")) {
    let address = localStorage.getItem("address")
    let keyword = localStorage.getItem("keyword")
    let hint = localStorage.getItem("hint")
    let phone = localStorage.getItem("phone")

    setAddress(address);
    setKeyword(keyword);
    setHint(hint);
    setPhone(phone);
  }

  


  const handleSubmit = () => {
    if (address == "" || phone == "" || keyword == "" || hint == "") {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else {
      axios
        .put(`/NewMember/addPersonalInfo?semesterid=${semesterId}`, {
          email: email,
          address: address,
          keyword: keyword,
          hint: hint,
          phone: phone,
        })
        .then((res) => {
          createNewProject();
        })
        .catch((err) => {
          toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
        });
    }
  };

  const createNewProject = () => {
    axios
      .post(`/NewMember/newProject?semesterid=${semesterId}`, {
        studentEmail: email,
      })
      .then((res) => {
        localStorage.setItem("advisor1", res.data.advisor1)
        navigate("/create-project")
      })
      .catch((err) => {
        toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
      });
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
            <Stack alignItems="center">
              <Typography variant="h3">ข้อมูลส่วนบุคคล</Typography>
            </Stack>
            <Stack direction="row" spacing={16}>
              <Typography variant="subtitle2">รหัสนิสิต</Typography>
              <Typography variant="body2">{studentId}</Typography>
            </Stack>
            <Stack direction="row" spacing={16}>
              <Typography variant="subtitle2">อีเมลนิสิต</Typography>
              <Typography variant="body2">{email}</Typography>
            </Stack>
            <Stack direction="row" spacing={16}>
              <Typography variant="subtitle2">ชื่อ-นามสกุล</Typography>
              <Typography variant="body2">{username}</Typography>
            </Stack>
            <Stack spacing={16}>
              <Typography variant="subtitle2">ที่อยู่</Typography>
              <TextField
                multiline
                label="ที่อยู่ตามบัตรประชาชน"
                onChange={(event) => setAddress(event.target.value)}
              />
            </Stack>
            <Stack spacing={16}>
              <Typography variant="subtitle2">เบอร์โทรศัพท์</Typography>
              <TextField
                label="เบอร์โทรศัพท์"
                onChange={(event) => setPhone(event.target.value)}
              />
            </Stack>
            <Stack spacing={16}>
              <Typography variant="subtitle2">คีย์เวิร์ดยืนยันตัวตน</Typography>
              <TextField
                label="คำใบ้สำหรับคีย์เวิร์ด"
                onChange={(event) => setHint(event.target.value)}
              />
              <TextField
                label="คีย์เวิร์ดยืนยันตัวตน"
                onChange={(event) => setKeyword(event.target.value)}
              />
            </Stack>

            <Stack alignItems="end">
              <Button variant="contained" onClick={handleSubmit}>
                ดำเนินการต่อ
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
      <Footer />
    </Stack>
  );
}
