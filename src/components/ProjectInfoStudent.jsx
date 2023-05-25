import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Button, Paper, Stack, Typography } from "@mui/material";
import CustomizedModal from "./Modal";
import StudentUploadTable from "./StudentUploadTable";
import SnackBar from "./SnackBar";
import { clearStorage, getStatus } from "../middleware/Auth";

export default function ProjectInfoStudent() {
  const [data, setData] = useState([]);
  const path = localStorage.getItem("projectPath") || "project";
  const token = localStorage.getItem("token");
  const { toggle, semesterId } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [projNameTh, setProjNameTh] = useState();
  const [projNameEn, setProjNameEn] = useState();
  const [showedProjNameTh, setshowedProjNameTh] = useState();
  const [showedProjNameEn, setshowedProjNameEn] = useState();
  const [openEditThModal, setOpenEditThModal] = useState(false);
  const [openEditEnModal, setOpenEditEnModal] = useState(false);
  const [editProjNameSuccess, setEditProjNameSuccess] = useState(false);
  const [editProjNameFailed, setEditProjNameFailed] = useState(false);

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

  const handleClose = () => {
    setOpenEditEnModal(false);
    setOpenEditThModal(false);

    setProjNameTh(data.projectNameTh);
    setProjNameEn(data.projectNameEn);
  };

  const handleCloseError = () => {
    setError(true);
  }

  const handleCloseSuccessSnackBar = () => {
    setEditProjNameSuccess(false);
    window.location.reload();
  };

  const handleCloseFailedSnackBar = () => {
    setEditProjNameFailed(false);
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
        setProjNameEn(res.data.projectNameEn);
        setProjNameTh(res.data.projectNameTh);
        setshowedProjNameEn(res.data.projectNameEn);
        setshowedProjNameTh(res.data.projectNameTh);
        setData(res.data);
      })
      .catch((err) => {
        if(getStatus(err)=="401") {
          clearStorage();
        }
        setError(true);
        setLoading(false);
      });
  }, [toggle, semesterId]);

  if (loading) {
    return <p>loading...</p>;
  }

  // if (error) {
  //   return <p>Err: {error.message} </p>;
  // }

  const editProjectThName = () => {
    setshowedProjNameTh(projNameTh);
    axios
      .put(
        `${path}Info/edit${path}NameTh `,
        {
          projectNameTh: projNameTh,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            timeout: 5 * 1000,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setEditProjNameSuccess(true);
        setOpenEditThModal(false);
      })
      .catch((err) => {
        if(getStatus(err)=="401") {
          clearStorage();
        }
        setEditProjNameFailed(true);
        setLoading(false);
      });
  };

  const editProjectEnName = () => {
    setshowedProjNameEn(projNameEn);
    axios
      .put(
        `${path}Info/edit${path}NameEn `,
        {
          projectNameEn: projNameEn,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            timeout: 5 * 1000,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setEditProjNameSuccess(true);
        setOpenEditEnModal(false);
      })
      .catch((err) => {
        if(getStatus(err)=="401") {
          clearStorage();
        }
        setEditProjNameFailed(true);
        setLoading(false);
      });
  };

  return (
    <div>
      <SnackBar
        open={error}
        message="เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
        severity="error"
        handleClose={handleCloseError}
      />
      <Stack alignItems="center" spacing={32} sx={{ mb: 48 }}>
        {data ? (
          <Paper sx={{ width: 1000, p: 32 }}>
            <Stack>
              {Object.entries(data).map(([key, value], index) => {
                if (value == null || key == "id") {
                  // Skip null and undefined values
                  return null;
                } else if (key == "projectNameTh") {
                  return (
                    <Stack direction="row" spacing={8} key={index}>
                      <Typography variant="subtitle2">
                        {keyMap[key]}:
                      </Typography>
                      <Typography variant="body2">
                        {showedProjNameTh}
                      </Typography>
                    </Stack>
                  );
                } else if (key == "projectNameEn") {
                  return (
                    <Stack direction="row" spacing={8} key={index}>
                      <Typography variant="subtitle2">
                        {keyMap[key]}:
                      </Typography>
                      <Typography variant="body2">
                        {showedProjNameEn}
                      </Typography>
                    </Stack>
                  );
                }
                return (
                  <Stack direction="row" spacing={8} key={index}>
                    <Typography variant="subtitle2">{keyMap[key]}:</Typography>
                    <Typography variant="body2">{value}</Typography>
                  </Stack>
                );
              })}
            </Stack>
            <Stack direction="row" spacing={8} justifyContent="end">
              <Button
                variant="contained"
                onClick={() => setOpenEditThModal(true)}
              >
                แก้ไขชื่อโครงงานภาษาไทย
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpenEditEnModal(true)}
              >
                แก้ไขชื่อโครงงานภาษาอังกฤษ
              </Button>
            </Stack>
          </Paper>
        ) : (
          <Typography variant="subtitle1" color="red">
            ไม่พบข้อมูล
          </Typography>
        )}
        <StudentUploadTable />
      </Stack>
      {/* Edit Th Project Name Modal */}
      <CustomizedModal
        isPassword={false}
        ModalHeader="แก้ไขชื่อโครงงานภาษาไทย"
        open={openEditThModal}
        handleClose={handleClose}
        oldLabel="ขื่อโครงงานเดิม"
        newLabel="ชื่อโครงงานใหม่"
        defaultValue={projNameTh}
        setOnChange={setProjNameTh}
        setOldPassword=""
        setNewPassword=""
        setEditOnClick={editProjectThName}
      />

      {/* Edit En Project Name Modal */}
      <CustomizedModal
        isPassword={false}
        ModalHeader="แก้ไขชื่อโครงงานภาษาอังกฤษ"
        open={openEditEnModal}
        handleClose={handleClose}
        oldLabel="ขื่อโครงงานเดิม"
        newLabel="ชื่อโครงงานใหม่"
        defaultValue={projNameEn}
        setOnChange={setProjNameEn}
        setOldPassword=""
        setNewPassword=""
        setEditOnClick={editProjectEnName}
      />

      <SnackBar
        open={editProjNameSuccess}
        message="แก้ไขชื่อโครงงานสำเร็จ"
        severity="success"
        handleClose={handleCloseSuccessSnackBar}
      />

      <SnackBar
        open={editProjNameFailed}
        message="เกิดข้อผิดพลาด กรุณาลองใหม่"
        severity="error"
        handleClose={handleCloseFailedSnackBar}
      />
    </div>
  );
}
