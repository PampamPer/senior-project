import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Button, Stack, Typography } from "@mui/material";

export default function ProjectInfoStudent() {
  const [data, setData] = useState([]);
  const path = localStorage.getItem("projectPath") || "project";
  const token = localStorage.getItem("token");
  const { setIsLogged } = useContext(AppContext);
  const { toggle, semesterId } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const keyMap = {
    no: "หมายเลขโครงงาน",
    major: "ภาควิชา",
    projectNameTh: "ชื่อโครงงานภาษาไทย",
    projectNameEn: "ชื่อโครงงานภาษาอังกฤษ",
    semester: "ภาคการศึกษา",
    advisor1: "อาจารย์ที่ปรึกษาโครงงาน 1",
    advisor2: "อาจารย์ที่ปรึกษาโครงงาน 2",
    committee1: "กรรมการ 1",
    committee2: "กรรมการ 2",
    student1: "สมาชิกโครงงาน 1",
    student2: "สมาชิกโครงงาน 2",
    student3: "สมาชิกโครงงาน 3",
    gradeStudent1: "ผลการศึกษาสมาชิกคนที่ 1",
    gradeStudent2: "ผลการศึกษาสมาชิกคนที่ 2",
    gradeStudent3: "ผลการศึกษาสมาชิกคนที่ 3",
  };

  useEffect(() => {
    axios
      .get(
        `/${path}info/student?semesterid=${semesterId}`,
        // "/projectinfo/lecturer?semesterid=2&filter=relevance",
        {
          headers: {
            Authorization: "Bearer " + token,
            timeout: 5 * 1000,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setIsLogged(true);
        if (res.data) {
          console.log("get data");
          setData(res.data);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [toggle, semesterId]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Err: {error.message} </p>;
  }

  const editProjectName = ()=>{}

  return (
    <div>
      <Stack alignItems="center" sx={{ position: "relative" }}>
        <Button variant="contained" sx={{ position: "absolute", right: 0 }}>
          แก้ไขชื่อโครงงาน
        </Button>
        <Stack>
          {Object.entries(data).map(([key, value]) => {
            if (value == null || key == "id") {
              // Skip null and undefined values
              return null;
            }
            return (
              <Stack direction="row" spacing={8}>
                <Typography variant="subtitle2" key={key}>
                  {keyMap[key]}:
                </Typography>
                <Typography variant="body2" key={key}>
                  {value}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </div>
  );
}
