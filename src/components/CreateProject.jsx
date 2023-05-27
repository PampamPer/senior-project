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
import CreateProject2 from "./CreateProject2";

export default function CreateProject() {
  const email = localStorage.getItem("email");
  const hasProject = localStorage.getItem("advisor1") != null;
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
  };

  let navigate = useNavigate();

  if (hasProject) {
    console.log(hasProject)
    axios
      .post(`/NewMember/newProject?semesterid=${semesterId}`, {
        studentEmail: email,
      })
      .then((res) => {
        setDataIfHasProject(res.data);
      })
      .catch((err) => {
        toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
      });
  }

  return (
    <Stack gap={96} className="content">
      <NavBar />
      {hasProject ? (
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
                  label="อาจารย์ที่ปรึกษา 1"
                  value={advisor1}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <div>
                  {advisor2 != null || (
                    <TextField
                      label="อาจารย์ที่ปรึกษา 2"
                      value={advisor2}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                </div>
              </Stack>
              <Stack spacing={16}>
                <Typography variant="subtitle2">สมาชิกโครงงาน</Typography>
                <TextField
                  label="สมาชิกโครงงาน 1"
                  value={student1}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <div>
                  {student2 != null || (
                    <TextField
                      label="สมาชิกโครงงาน 2"
                      value={student2}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                </div>
                <div>
                  {student3 != null || (
                    <TextField
                      label="สมาชิกโครงงาน 3"
                      value={student3}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                </div>
              </Stack>

              {/* <Stack spacing={16}>
              <Typography variant="subtitle2">ชื่อโครงงาน</Typography>
              <TextField value={projectNameEn} InputProps={{readOnly:true}}/>
            </Stack> */}
              <Stack direction="row" justifyContent="space-between">
                <Button
                  variant="outlined"
                  sx={{ width: 85 }}
                  onClick={() => navigate("/personal-info")}
                >
                  ย้อนกลับ
                </Button>
                <Button
                  variant="contained"
                  sx={{ width: 85 }}
                  onClick={() => navigate("/sign-in")}
                >
                  ยืนยัน
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      ) : (
        <CreateProject2 />
      )}
      <Footer />
    </Stack>
  );
}
