import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
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
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import SnackBar from "./SnackBar";

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
  const projectNames = new Map();
  const [uploadData, setUploadData] = useState([]);
  const [gradingData, setGradingData] = useState([]);
  const formData = new FormData();
  const [selectFile, setSelectFile] = useState();
  const [uploadFileID, setUploadFileID] = useState();
  const [gradingFileID, setGradingFileID] = useState();
  const uploadTableRef = useRef(null);
  const gradingTableRef = useRef(null);
  const [uploadFileSuccess, setUploadFileSuccess] = useState(false);
  const [uploadFileFailed, setUploadFileFailed] = useState(false);

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
        if (filter == "relevance") {
          setArrId(res.data);
        }
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
  ];

  const childToParent = (childdata) => {
    setFilteredData(childdata);
  };

  const handleClose = () => {
    setOpenGradingHistory(false);
    setOpenUploadHistory(false);
    setOpenGradingUpload(false);
  };

  const handleCloseSuccessSnackBar = () => {
    setUploadFileSuccess(true);
    window.location.reload();
  };

  const handleCloseFailedSnackBar = () => {
    setUploadFileFailed(true);
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
    setUploadFileID(projectId);
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
          uploadTableRef.current.scrollIntoView({
            behavior: "smooth",
          });
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
    setGradingFileID(projectId);
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
        gradingTableRef.current.scrollIntoView({
          behavior: "smooth",
        });
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const uploadGrading = (event) => {
    const newGradingFile = event.target.files[0];
    setSelectFile(newGradingFile);
  };

  const submitGrading = () => {
    formData.append("file", selectFile);
    setOpenGradingUpload(false);
    axios
      .put(`/${path}Uploads?${path}Id=${gradingFileID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
          timeout: 5 * 1000,
        },
      })
      .then((res) => {
        setLoading(false);
        setIsLogged(true);
        alert("Upload Grading file success!");
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
        projectNames.set(proj.id, proj.no + " - " + proj.projectNameTh);
      })}

      {/* Modal ประวัติการส่งงาน */}
      <UploadModal
        open={openUploadHistory}
        handleClose={handleClose}
        ModalHeader={"ดูประวัติการส่งงาน"}
        selectOption={selectName}
        setSubmit={getUploading}
        uploadFile={false}
        inputLabel={"เลือกโครงงาน"}
      />

      {/* Modal ใบรายงานผลสอบ */}
      <UploadModal
        open={openGradingHistory}
        handleClose={handleClose}
        ModalHeader={"จัดการใบรายงานผลสอบ"}
        selectOption={selectName}
        setSubmit={getGrading}
        uploadFile={false}
        inputLabel={"เลือกโครงงาน"}
      />

      <Stack spacing={56} mb={48}>
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
        <Stack alignItems="center" spacing={56}>
          {showUploadTable && (
            <Stack ref={uploadTableRef} alignItems="center" spacing={32}>
              <Typography variant="h5" color="#2D95E1">
                ประวัติการส่งงาน
              </Typography>
              <Stack direction="row" spacing={32}>
                <Typography variant="subtitle1" sx={{ minWidth: 104 }}>
                  โครงงานที่เลือก
                </Typography>
                <Typography variant="body1">
                  {projectNames.get(uploadFileID)}
                </Typography>
              </Stack>
              <CustomizedTables
                data={uploadData}
                columns={uploadColumns}
                linkcolumns={uploadlinkColumns}
                linkname={uploadlinkName}
              />
            </Stack>
          )}

          {showGradingTable && (
            <Stack ref={gradingTableRef} alignItems="center" spacing={32}>
              <Typography variant="h5" color="#2D95E1">
                ใบรายงานผลสอบ
              </Typography>
              <Paper sx={{ p: 24, width: 850 }}>
                <Stack alignItems="start" spacing={12}>
                  <Stack direction="row" spacing={128}>
                    <Stack direction="row" spacing={32}>
                      <Typography variant="subtitle1" sx={{ minWidth: 104 }}>
                        โครงงานที่เลือก
                      </Typography>
                      <Typography variant="body1">
                        {projectNames.get(gradingFileID)}
                      </Typography>
                    </Stack>
                    {/* คลิกปุ่มแล้วเรียก Modal เพื่ออัปโหลดไฟล์ */}
                    <Button
                      variant="contained"
                      onClick={() => setOpenGradingUpload(true)}
                    >
                      อัปโหลดใบรายงานผลสอบ
                    </Button>
                  </Stack>
                  <Stack direction="row" spacing={32}>
                    <Typography variant="subtitle1" sx={{ minWidth: 104 }}>
                      ใบรายงานผลสอบ
                    </Typography>
                    <Link
                      href={gradingData.url}
                      underline="hover"
                      color="#0075FF"
                    >
                      {gradingData.fileName}
                    </Link>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          )}
        </Stack>
      </Stack>
      {/* Modal อัปโหลดใบรายงานผลสอบ */}
      <UploadModal
        open={openGradingUpload}
        handleClose={handleClose}
        ModalHeader={"อัปโหลดใบรายงานผลสอบ"}
        selectOption={[]}
        setSubmit={submitGrading}
        uploadFile={true}
        uploadFunction={uploadGrading}
        selectFile={selectFile}
        inputLabel={"เลือกโครงงาน"}
      />

      <SnackBar
        open={uploadFileSuccess}
        message="อัปโหลดไฟล์สำเร็จ"
        severity="success"
        handleClose={handleCloseSuccessSnackBar}
      />

      <SnackBar
        open={uploadFileFailed}
        message="เกิดข้อผิดพลาด กรุณาลองใหม่"
        severity="error"
        handleClose={handleCloseFailedSnackBar}
      />
    </div>
  );
}
