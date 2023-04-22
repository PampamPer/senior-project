import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { preprocess } from "./Table";
import CustomTable from "./CustomTable";
import UploadModal from "./UploadModal";
import { FormControl, InputLabel, Menu, MenuItem, Select, Typography } from "@mui/material";

export default function ProjectInfoLecturer() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("relevance");
  const path = localStorage.getItem("projectPath") || "project";
  const token = localStorage.getItem("token");
  const { setIsLogged } = useContext(AppContext);
  const { toggle, semesterId } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openUploadHistory, setOpenUploadHistory] = useState(false);
  const [openGradingHistory, setOpenGradingHistory] = useState(false);
  const [showUploadTable, setShowUploadTable] = useState(false);
  const [showGradingTable, setShowGradingTable] = useState(false);
  const selectName = [];
  const [age, setAge] = useState("");

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
        }
      )
      .then((res) => {
        setLoading(false);
        setIsLogged(true);
        if (res.data) {
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
              ],
              [],
              []
            )
          );
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
  }, [toggle, semesterId, filter]);

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
  ];
  const linkColumns = ["lastAssignmentURL"];
  const linkName = "latestAssignmentName";

  const childToParent = (childdata) => {
    setFilteredData(childdata);
  };

  const handleClose = () => {
    setOpenGradingHistory(false);
    setOpenUploadHistory(false);
  };

  

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Age</InputLabel>
        <Select label="Age" value={age} onChange={(event)=>setAge(event.target.value)}>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="20">20</MenuItem>
          <MenuItem value="30">30</MenuItem>
        </Select>
      </FormControl>
      <CustomTable
        data={data}
        columns={columns}
        childToParent={childToParent}
        linkcolumns={linkColumns}
        linkname={linkName}
        filteredData={filteredData}
        originalFilter={false}
        setFilter={setFilter}
        isProjectInfo={true}
        openModal1={setOpenUploadHistory}
        openModal2={setOpenGradingHistory}
      />
      {data.map((proj) => {
        selectName.push(proj.no + " - " + proj.projectNameTh);
      })}

      {/* Modal ประวัติการส่งงาน */}
      <UploadModal
        open={openUploadHistory}
        handleClose={handleClose}
        ModalHeader={"ดูประวัติการส่งงาน"}
        selectOption={selectName}
        setSubmit={setShowUploadTable}
      />

      {showUploadTable && <Typography variant="h3">This is work?</Typography>}
    </div>
  );
}
