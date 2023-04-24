import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import CustomizedTables, { preprocess } from "./Table";
import CustomTable from "./CustomTable";
import UploadModal from "./UploadModal";
import {
  Button,
  FormControl,
  InputLabel,
  Link,
  Menu,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

export default function ProjectInfoLecturer() {
  const [data, setData] = useState([]);
  const [arrId, setArrId] = useState([]);
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
  const [openGradingUpload, setOpenGradingUpload] = useState(false);
  const [showUploadTable, setShowUploadTable] = useState(false);
  const [showGradingTable, setShowGradingTable] = useState(false);
  const selectName = new Map();
  const [uploadData, setUploadData] = useState([]);
  const [gradingData, setGradingData] = useState([]);
  const formData = new FormData();

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
        setArrId(res.data);
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

  const childToParent = (childdata) => {
    setFilteredData(childdata);
  };

  const handleClose = () => {
    setOpenGradingHistory(false);
    setOpenUploadHistory(false);
    setOpenGradingUpload(false);
  };

  const uploadColumns = [
    {
      id: "assignmentName",
      label: "ชื่องาน",
      sx: { width: "60%", minWidth: 300 },
    },
    {
      id: "submitDate",
      label: "วันที่ส่ง",
      sx: { width: "20%", minWidth: 250 },
    },
    { id: "sender", label: "ชื่อผู้ส่ง", sx: { width: "20%", minWidth: 300 } },
  ];

  const uploadlinkColumns = ["fileName"];
  const uploadlinkName = "assignmentName";

  const getUploading = (projectName) => {
    setOpenUploadHistory(false);
    setShowUploadTable(true);
    const projectId = selectName.get(projectName);
    axios
      .get(`/${path}Uploads/lecturer?${path}Id=${projectId}`, {
        headers: {
          Authorization: "Bearer " + token,
          timeout: 5 * 1000,
        },
      })
      .then((res) => {
        setLoading(false);
        setIsLogged(true);
        if (res.data) {
          setUploadData(
            preprocess(
              res.data,
              ["assignmentName", "fileName", "submitDate", "sender"],
              [],
              ["submitDate"]
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
  };

  const getGrading = (projectName) => {
    setOpenGradingHistory(false);
    setShowGradingTable(true);
    const projectId = selectName.get(projectName);
    axios
      .get(`/${path}Uploads/grading?${path}Id=${projectId}`, {
        headers: {
          Authorization: "Bearer " + token,
          timeout: 5 * 1000,
        },
      })
      .then((res) => {
        setLoading(false);
        setIsLogged(true);
        setGradingData(res.data);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const uploadGrading = (projectName) => {
    setOpenGradingHistory(false);
    setShowGradingTable(true);
    const projectId = selectName.get(projectName);
    axios
      .put(`/${path}Uploads?${path}Id=${projectId}`, {
        ///ProposalUpload?ProposalId={id} 
        headers: {
          Authorization: "Bearer " + token,
          timeout: 5 * 1000,
        },
      })
      .then((res) => {
        setLoading(false);
        setIsLogged(true);
        setGradingData(res.data);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return (
    // const dict = {id: "", id2: ""}
    <div>
      {arrId.map((proj) => {
        selectName.set(proj.no + " - " + proj.projectNameTh, proj.id);
        //selectName.push(proj.no + " - " + proj.projectNameTh);
      })}

      {/* Modal ประวัติการส่งงาน */}
      <UploadModal
        open={openUploadHistory}
        handleClose={handleClose}
        ModalHeader={"ดูประวัติการส่งงาน"}
        selectOption={selectName}
        setSubmit={getUploading}
        uploadFile={false}
      />

      {/* Modal ใบรายงานผลสอบ */}
      <UploadModal
        open={openGradingHistory}
        handleClose={handleClose}
        ModalHeader={"จัดการใบรายงานผลสอบ"}
        selectOption={selectName}
        setSubmit={getGrading}
        uploadFile={false}
      />

      <Stack spacing={56}>
        <CustomTable
          data={data}
          columns={columns}
          childToParent={childToParent}
          linkcolumns={[]}
          linkname={[]}
          filteredData={filteredData}
          originalFilter={false}
          setFilter={setFilter}
          isProjectInfo={true}
          openModal1={setOpenUploadHistory}
          openModal2={setOpenGradingHistory}
        />

        {showUploadTable && (
          <Stack alignItems="center" spacing={32}>
            <Typography variant="h5" color="#2D95E1">
              ประวัติการส่งงาน
            </Typography>
            <CustomizedTables
              data={uploadData}
              columns={uploadColumns}
              linkcolumns={uploadlinkColumns}
              linkname={uploadlinkName}
            />
          </Stack>
        )}

        {showGradingTable && (
          <Stack alignItems="center" spacing={32}>
            <Typography variant="h5" color="#2D95E1">
              ใบรายงานผลสอบ
            </Typography>
            <Stack alignItems="end">
              {/* คลิกปุ่มแล้วเรียก Modal เพื่ออัพโหลดไฟล์ */}
              <Button variant="contained" onClick={()=>setOpenGradingUpload(true)}>
                อัพโหลดใบรายงานผลสอบ
              </Button>
              <Link href={gradingData.url} underline="hover" color="#0075FF">
                {gradingData.fileName}
              </Link>
            </Stack>
          </Stack>
        )}

        {/* Modal อัพโหลดใบรายงานผลสอบ */}
      {/* <UploadModal
        open={openGradingUpload}
        handleClose={handleClose}
        ModalHeader={"อัพโหลดใบรายงานผลสอบ"}
        setSubmit={uploadGrading}
        uploadFile={true}
      /> */}
      </Stack>
    </div>
  );
}
