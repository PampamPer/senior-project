import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { preprocess } from "./Table";
import { Stack, Typography } from "@mui/material";
import CustomTable from "./CustomTable";
import ProjectInfoFilter from "./ProjectInfoFilter";

export default function ProjectInfo() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState(localStorage.getItem("filterRole") || "relevance");
  const path = localStorage.getItem("projectPath") || "project";
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const { setIsLogged } = useContext(AppContext);
  const { toggle, semesterId } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        `/${path}info/lecturer?semesterid=${semesterId}&filter=${filter}`, 
        // "/projectinfo/lecturer?semesterid=2&filter=relevance",
      {
        headers: {
          Authorization: "Bearer " + token,
          timeout: 5 * 1000,
        },
      })
      .then((res) => {
        console.log(`/${path}info/lecturer?semesterid=${semesterId}&filter=${filter}`)
        setLoading(false);
        setIsLogged(true);
        if (res.data) {
          console.log("get data");
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
          );console.log("this is data", res.data);
          setFilteredData(
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

  const columns = [
    { id: "no", label: "หมายเลขโครงงาน", sx: { minWidth: 150 } },
    { id: "major", label: "ภาควิชา", sx: { minWidth: 80 } },
    { id: "projectNameTh", label: "ชื่อโครงงานภาษาไทย", sx: { minWidth: 300 } },
    {
      id: "projectNameEn",
      label: "ชื่อโครงงานภาษาอังกฤษ",
      sx: { minWidth: 300 },
    },
    { id: "semester", label: "ภาคการศึกษา", sx: { minWidth: 120 } },
    {
      id: "advisor1",
      label: "อาจารย์ที่ปรึกษาโครงงาน 1",
      sx: { minWidth: 250 },
    },
    {
      id: "advisor2",
      label: "อาจารย์ที่ปรึกษาโครงงาน 2",
      sx: { minWidth: 250 },
    },
    { id: "committee1", label: "กรรมการ 1", sx: { minWidth: 250 } },
    { id: "committee2", label: "กรรมการ 2", sx: { minWidth: 250 } },
    { id: "student1", label: "สมาชิกโครงงาน 1", sx: { minWidth: 250 } },
    { id: "student2", label: "สมาชิกโครงงาน 2", sx: { minWidth: 250 } },
    { id: "student3", label: "สมาชิกโครงงาน 3", sx: { minWidth: 250 } },
    {
      id: "gradeStudent1",
      label: "ผลการศึกษาสมาชิกคนที่ 1",
      sx: { minWidth: 125 },
    },
    {
      id: "gradeStudent2",
      label: "ผลการศึกษาสมาชิกคนที่ 2",
      sx: { minWidth: 125 },
    },
    {
      id: "gradeStudent3",
      label: "ผลการศึกษาสมาชิกคนที่ 3",
      sx: { minWidth: 125 },
    },
    // { id: "latestAssignmentName", label: "งานที่ส่งล่าสุด", sx: { minWidth: 180 } },
    {
      id: "lastAssignmentURL",
      label: "งานที่ส่งล่าสุด",
      sx: { minWidth: 180 },
    },
    { id: "latestSubmitDate", label: "ส่งงานล่าสุด", sx: { minWidth: 120 } },
  ];
  const linkColumns = ["lastAssignmentURL"];
  const linkName = "latestAssignmentName";

  const childToParent = (childdata) => {
    setFilteredData(childdata);
  };

  // const result = Object.keys(data).map((key) => {key, data[key]});
  // const temp = [result]
  // setData(preprocess(temp, [
  //   "no",
  //   "major",
  //   "projectNameTh",
  //   "projectNameEn",
  //   "semester",
  //   "advisor1",
  //   "advisor2",
  //   "committee1",
  //   "committee2",
  //   "student1",
  //   "student2",
  //   "student3",
  //   "gradeStudent1",
  //   "gradeStudent2",
  //   "gradeStudent3",
  //   "latestAssignmentName",
  //   "lastAssignmentURL",
  //   "latestSubmitDate",
  // ], [], []))
  // console.log(typeof temp)

  return (
    <div>
      <NavBar />
      <ProjectInfoFilter/>
      {role == "lecturer" ? (
        <CustomTable
          data={data}
          columns={columns}
          childToParent={childToParent}
          linkcolumns={linkColumns}
          linkname={linkName}
          filteredData={filteredData}
        />
      ) : (
        <Stack>
          <Typography>asdasd</Typography>
        </Stack>
      )}

      <Footer />
    </div>
  );
}
