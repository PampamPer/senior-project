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

export default function CreateProject2() {
  const studentId = localStorage.getItem("studentId");
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");
  const hasProject = localStorage.getItem("advisor1") != null;
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [hint, setHint] = useState("");
  const [keyword, setKeyword] = useState("");
  const { semesterId } = useContext(AppContext);

  const [projectNameEn, setProjectNameEn] = useState("");
  const [projectNameTh, setProjectNameTh] = useState("");
  const [advisor1, setAdvisor1] = useState("");
  const [advisor2, setAdvisor2] = useState("");
  const [student1, setStudent1] = useState("");
  const [student2, setStudent2] = useState("");
  const [student3, setStudent3] = useState("");

  const setDataIfHasProject = (data) => {
    setProjectNameEn(data.projectNameEn);
    setProjectNameTh(data.projectNameTh);
    setAdvisor1(data.advisor1);
    setAdvisor2(data.advisor2);
    setStudent1(data.student1);
    setStudent2(data.student2);
    setStudent3(data.student3);
  }


  let navigate = useNavigate();

  const handleSubmit = () => {
    if (address == "" || phone == "" || keyword == "" || hint == "") {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else {
      navigate("/create-project");
      //   axios
      //     .post(`/NewMember/addPersonalInfo?semesterid=${semesterId}`, {
      //       email: email,
      //       address: address,
      //       keyword: keyword,
      //       hint: hint,
      //       phone: phone,
      //     })
      //     .then((res) => {
      //       navigate("/create-project");
      //     })
      //     .catch((err) => {
      //       toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
      //     });
    }
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
              <Typography variant="h3">ข้อมูลโครงงาน</Typography>
            </Stack>
            <Stack spacing={16}>
              <Typography variant="subtitle2">ชื่อโครงงาน</Typography>
              <TextField
                multiline
                label="ชื่อโครงงานภาษาอังกฤษ"
                value={projectNameEn}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                multiline
                label="ชื่อโครงงานภาษาไทย"
                value={projectNameTh}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
            <Stack spacing={16}>
              <Typography variant="subtitle2">
                อาจารย์ที่ปรึกษาโครงงาน
              </Typography>
              <TextField
                value={advisor1}
                InputProps={{
                  readOnly: true,
                }}
              />
              {advisor2 != null || (
                <TextField
                  value={advisor2}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            </Stack>
            <Stack spacing={16}>
              <Typography variant="subtitle2">
                  สมาชิกโครงงาน
              </Typography>
              <TextField
                value={student1}
                InputProps={{
                  readOnly: true,
                }}
              />
              {student2 != null || (
                <TextField
                  value={student2}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
              {student3 != null || (
                <TextField
                  value={student3}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Button
                variant="outlined"
                sx={{ width: 85 }}
                onClick={()=>navigate("/personal-info")}
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
