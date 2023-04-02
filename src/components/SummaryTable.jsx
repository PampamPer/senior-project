import React, { useEffect, useContext, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Table, { preprocess } from "./Table";
import { AppContext } from "../App";
import axios from "axios";

export default function DownloadFiles() {
  const [data, setData] = useState([]);
  const path = localStorage.getItem("projectPath") || "project";
  const { toggle, semesterId } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/${path}summary?semesterid=${semesterId}`)
      // .get('/proposaltimelines?semesterid=1')
      .then((res) => {
        // console.log("this is res.data", res.data);
        setLoading(false);
        if (res.data) {
          // console.log("get data");
          setData(
            preprocess(
              res.data,
              [
                "no",
                "major",
                "projectNameTh",
                "projectNameEn",
                "semester",
                "advisor1",
                "advisor2",
                "committee1",
                "committee2",
                "student1",
                "student2",
                "student3",
                "gradeStudent1",
                "gradeStudent2",
                "gradeStudent3",
                "latestAssignmentName",
                "lastAssignmentURL",
                "latestSubmitDate",
              ],
              [],
              []
            )
          );
          // console.log("this is data", data);
        } else {
          setData([]);
          // console.log("dont get data");
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


  const columns = [
    { id: "no", label: "หมายเลขโครงงาน", sx: { minWidth: 150 }, },
    { id: "major", label: "ภาควิชา", sx: { minWidth: 80 }, },
    { id: "projectNameTh", label: "ชื่อโครงงานภาษาไทย", sx: { minWidth: 300 } },
    { id: "projectNameEn", label: "ชื่อโครงงานภาษาอังกฤษ", sx: { minWidth: 300 } },
    { id: "semester", label: "ภาคการศึกษา", sx: { minWidth: 120 } },
    { id: "advisor1", label: "อาจารย์ที่ปรึกษาโครงงาน 1", sx: { minWidth: 250 } },
    { id: "advisor2", label: "อาจารย์ที่ปรึกษาโครงงาน 2", sx: { minWidth: 250 } },
    { id: "committee1", label: "กรรมการ 1", sx: { minWidth: 250 } },
    { id: "committee2", label: "กรรมการ 2", sx: { minWidth: 250 } },
    { id: "student1", label: "สมาชิกโครงงาน 1", sx: { minWidth: 250 } },
    { id: "student2", label: "สมาชิกโครงงาน 2", sx: { minWidth: 250 } },
    { id: "student3", label: "สมาชิกโครงงาน 3", sx: { minWidth: 250 } },
    { id: "gradeStudent1", label: "ผลการศึกษาสมาชิกคนที่ 1", sx: { minWidth: 125 } },
    { id: "gradeStudent2", label: "ผลการศึกษาสมาชิกคนที่ 2", sx: { minWidth: 125 } },
    { id: "gradeStudent3", label: "ผลการศึกษาสมาชิกคนที่ 3", sx: { minWidth: 125 } },
    { id: "latestAssignmentName", label: "งานที่ส่งล่าสุด", sx: { minWidth: 180 } },
    { id: "lastAssignmentURL", label: "ลิงก์ดาวน์โหลดเอกสาร", sx: { minWidth: 250 } },
    { id: "latestSubmitDate", label: "ส่งงานล่าสุด", sx: { minWidth: 120 } },
  ];
  const linkColumns = ["lastAssignmentURL"];

  return (
    <div>
      <NavBar />
      <Table data={data} columns={columns} linkcolumns={linkColumns} />
      <Footer />
    </div>
  );
}
