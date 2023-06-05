import { useContext, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import {
  Typography,
  Paper,
  Stack,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { toast } from "react-hot-toast";
import { Add, Close } from "@mui/icons-material";
import CustomizedSelect from "./Select";

export default function CreateProject2() {
  const studentId = localStorage.getItem("studentId");
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");
  const [loading, setLoading] = useState(true);
  const { semesterId } = useContext(AppContext);
  const [major, setMajor] = useState("");
  const [projectNameEn, setProjectNameEn] = useState("");
  const [projectNameTh, setProjectNameTh] = useState("");
  const [advisor1, setAdvisor1] = useState("");
  const [advisor2, setAdvisor2] = useState();
  const [student2, setStudent2] = useState();
  const [student3, setStudent3] = useState();

  const [moreAdvisor, setMoreAdvisor] = useState(false);
  const [moreStudent2, setMoreStudent2] = useState(false);
  const [moreStudent3, setMoreStudent3] = useState(false);

  const [lecturerData, setLecturerData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const lecturerList = new Map();
  const studentList = new Map();

  let navigate = useNavigate();

  const storeData = () => {
    localStorage.setItem("major", major);
    localStorage.setItem("projTh", projectNameTh);
    localStorage.setItem("projEn", projectNameEn);
    localStorage.setItem("advisor1", advisor1);

    if (moreAdvisor) {
      localStorage.setItem("advisor2", advisor2);
    }
    if (moreStudent2) {
      localStorage.setItem("student2", student2);
    }
    if (moreStudent3) {
      localStorage.setItem("student3", student3);
    }
  };

  const returnPage = () => {
    navigate("/personal-info");
    storeData();
  };

  useEffect(() => {
    const major = localStorage.getItem("major");
    const projTh = localStorage.getItem("projTh");
    const projEn = localStorage.getItem("projEn");
    const advisor1 = localStorage.getItem("advisor1");
    const advisor2 = localStorage.getItem("advisor2");
    const student2 = localStorage.getItem("student2");
    const student3 = localStorage.getItem("student3");

    if (advisor2) {
      setAdvisor2(advisor2);
    }
    if (student2) {
      setStudent2(student2);
    }
    if (student3) {
      setStudent3(student3);
    }

    setMajor(major);
    setProjectNameTh(projTh);
    setProjectNameEn(projEn);
    setAdvisor1(advisor1);
  }, []);

  const handleSubmit = () => {
    if (moreStudent2 || moreStudent3) {
      if (!student2) {
        toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      } else if (moreStudent3 && !student3) {
        toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      }
    }
    if (moreAdvisor) {
      if (!advisor2) toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
    if (
      projectNameEn == "" ||
      projectNameTh == "" ||
      advisor1 == "" ||
      major == ""
    ) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else {
      toast.promise(
        axios.put(`NewMember/addProjectInfo?semesterid=${semesterId}`, {
          email: email,
          major: major,
          projectNameTh: projectNameTh,
          projectNameEn: projectNameEn,
          advisorId1: advisor1,
          advisorId2: advisor2,
          studentId1: studentId,
          studentId2: student2,
          studentId3: student3,
        }),
        {
          loading: "กำลังดำเนินการ...",
          success: () => {
            sendMail();
            return "เพิ่มข้อมูลโครงงานสำเร็จ";
          },
          error: () => {
            return "เกิดข้อผิดพลาด กรุณาลองใหม่";
          },
        }
      );
    }
  };

  const sendMail = () => {
    toast.promise(
      axios.post(`/NewMember/verifyProjectInfo?SemesterId=${semesterId}`, {
        studentEmail: email,
      }),
      {
        loading: "กำลังดำเนินการ...",
        success: () => {
          navigate("/verify-project");
          return "ส่งอีเมลยืนยันให้อาจารย์สำเร็จ";
        },
        error: () => {
          return "เกิดข้อผิดพลาด กรุณาลองใหม่";
        },
      }
    );
  };

  const setMoreStudent = () => {
    if (major == "") {
      toast.error("กรุณาเลือกสาขา");
    } else {
      setMoreStudent2(true);
    }
  };

  const handleOnChange = (event) => {
    let major = event.target.value;
    setMajor(major);
    fetchStudentList(major);
  };

  const fetchStudentList = (major) => {
    axios
      .get(`/NewMember/studentList?major=${major}&email=${email}`)
      // .get(`/NewMember/studentList?major=${major}&semesterid=${semesterId}`)
      .then((res) => {
        setLoading(false);
        setStudentData(res.data);
      })
      .catch((err) => {
        toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
        setLoading(false);
      });
  };
  const getAdv1Id = (name) => {
    const id = lecturerList.get(name);
    setAdvisor1(id);
    localStorage.setItem("advisor1", name);
  };

  const getAdv2Id = (name) => {
    const id = lecturerList.get(name);
    setAdvisor2(id);
    localStorage.setItem("advisor2", name);
  };

  const getStd2Id = (name) => {
    const id = studentList.get(name);
    setStudent2(id);
  };

  const getStd3Id = (name) => {
    const id = studentList.get(name);
    setStudent3(id);
  };

  const clearAdvisor = () => {
    setMoreAdvisor(false);
    setAdvisor2();
    localStorage.removeItem("advisor2");
  };

  const clearStudent2 = () => {
    setMoreStudent2(false);
    setStudent2();
  };

  const clearStudent3 = () => {
    setMoreStudent3(false);
    setStudent3();
  };

  useEffect(() => {
    axios
      .get("/NewMember/lecturerlist")
      .then((res) => {
        setLoading(false);
        setLecturerData(res.data);
      })
      .catch((err) => {
        toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
        setLoading(false);
      });
  }, []);

  // if (loading) {
  //   return <p>loading...</p>;
  // }

  return (
    <div>
      {lecturerData.map((lecturer) => {
        lecturerList.set(lecturer.fullName, lecturer.lecturerId);
      })}

      {studentData.length != 0 &&
        studentData.map((student) => {
          studentList.set(
            student.studentId + " - " + student.fullName,
            student.studentId
          );
        })}

      <Stack alignItems="center">
        <Paper
          elevation={4}
          sx={{ opacity: 0.75, p: 48, width: 500, borderRadius: 3 }}
        >
          <Stack maxWidth="360px" m="auto" spacing={24}>
            <Stack alignItems="center">
              <Typography variant="h3">ข้อมูลโครงงาน</Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle2">สาขา</Typography>
              <FormControlLabel
                // control={<Checkbox color="secondary" />}
                control={
                  <Checkbox
                    checked={major == "math"}
                    color="secondary"
                    value="math"
                    onChange={(event) => handleOnChange(event)}
                  />
                }
                label="สาขาคณิตศาสตร์"
              />
              <FormControlLabel
                // control={<Checkbox color="secondary" />}
                control={
                  <Checkbox
                    checked={major == "comp"}
                    color="secondary"
                    value="comp"
                    onChange={(event) => handleOnChange(event)}
                  />
                }
                label="สาขาวิทยาการคอมพิวเตอร์"
              />
            </Stack>
            <Stack spacing={16}>
              <Typography variant="subtitle2">ชื่อโครงงาน</Typography>
              <TextField
                multiline
                label="ชื่อโครงงานภาษาไทย"
                value={projectNameTh}
                onChange={(event) => setProjectNameTh(event.target.value)}
              />
              <TextField
                multiline
                label="ชื่อโครงงานภาษาอังกฤษ"
                value={projectNameEn}
                onChange={(event) => setProjectNameEn(event.target.value)}
              />
            </Stack>
            <Stack spacing={16}>
              <Typography variant="subtitle2">
                อาจารย์ที่ปรึกษาโครงงาน
              </Typography>
              <CustomizedSelect
                inputLabel="อาจารย์ที่ปรึกษาโครงงาน"
                selectOption={lecturerList}
                setValue={getAdv1Id}
              />
              <div>
                {moreAdvisor ? (
                  <Stack direction="row" spacing={8}>
                    <CustomizedSelect
                      inputLabel="อาจารย์ที่ปรึกษาโครงงาน"
                      selectOption={lecturerList}
                      setValue={getAdv2Id}
                    />

                    <IconButton onClick={clearAdvisor} sx={{ width: 56 }}>
                      <Close />
                    </IconButton>
                  </Stack>
                ) : (
                  <Stack alignItems="center">
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={() => setMoreAdvisor(true)}
                    >
                      เพิ่มอาจารย์ที่ปรึกษาโครงงาน
                    </Button>
                  </Stack>
                )}
              </div>
            </Stack>
            <Stack spacing={16}>
              <Typography variant="subtitle2">สมาชิกโครงงาน</Typography>
              <TextField
                label="สมาชิกโครงงาน 1"
                defaultValue={username}
                InputProps={{
                  readOnly: true,
                }}
              />

              <div>
                {moreStudent2 ? (
                  <Stack direction="row" spacing={8}>
                    <CustomizedSelect
                      inputLabel="สมาชิกโครงงาน 2"
                      selectOption={studentList}
                      setValue={getStd2Id}
                    />
                    <IconButton
                      onClick={clearStudent2}
                      sx={{ width: 56 }}
                      disabled={moreStudent3}
                    >
                      <Close />
                    </IconButton>
                  </Stack>
                ) : (
                  <Stack alignItems="center">
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={setMoreStudent}
                    >
                      เพิ่มสมาชิกโครงงาน
                    </Button>
                  </Stack>
                )}
              </div>

              <div>
                {moreStudent3 ? (
                  <Stack direction="row" spacing={8}>
                    <CustomizedSelect
                      inputLabel="สมาชิกโครงงาน 3"
                      selectOption={studentList}
                      setValue={getStd3Id}
                    />
                    <IconButton onClick={clearStudent3} sx={{ width: 56 }}>
                      <Close />
                    </IconButton>
                  </Stack>
                ) : (
                  <div>
                    {moreStudent2 && (
                      <Stack alignItems="center">
                        <Button
                          variant="outlined"
                          startIcon={<Add />}
                          onClick={() => setMoreStudent3(true)}
                        >
                          เพิ่มสมาชิกโครงงาน
                        </Button>
                      </Stack>
                    )}
                  </div>
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
                onClick={returnPage}
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
    </div>
  );
}
