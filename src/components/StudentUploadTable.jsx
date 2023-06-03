import React, { useEffect, useContext, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Table, { preprocess } from "./Table";
import { AppContext } from "../App";
import axios from "axios";
import { Button, Stack, Typography } from "@mui/material";
import UploadModal from "./UploadModal";
import SnackBar from "./SnackBar";
import { clearStorage, getStatus } from "../middleware/Auth";
import { toast } from "react-hot-toast";

export default function StudentUploadTable() {
  const [data, setData] = useState([]);
  const [assignmentData, setAssignmentData] = useState(data);
  const token = localStorage.getItem("token");
  const path = localStorage.getItem("projectPath") || "project";
  const { toggle, semesterId } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const assignmentName = new Map();
  const formData = new FormData();
  const [selectedFile, setSelectedFile] = useState();
  const [uploadFileSuccess, setUploadFileSuccess] = useState(false);
  const [uploadFileFailed, setUploadFileFailed] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
    setSelectedFile();
  };

  useEffect(() => {
    axios
      .get(`/${path}Uploads/student?semesterId=${semesterId}`, {
        headers: {
          Authorization: "Bearer " + token,
          timeout: 5 * 1000,
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.data) {
          setData(
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
        if (getStatus(err) == "401") {
          clearStorage();
        }
        setError(true);
        setLoading(false);
      });

    axios
      .get(`/${path}assignments?semesterId=${semesterId}`)
      .then((res) => {
        setLoading(false);
        setAssignmentData(res.data);
      })
      .catch((err) => {
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

  const columns = [
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
  const linkColumns = ["fileName"];
  const linkName = "assignmentName";

  const uploadFile = (event) => {
    const newFile = event.target.files[0];
    setSelectedFile(newFile);
  };

  const submitUpload = (asmName) => {
    setOpenModal(false);
    const asmId = assignmentName.get(asmName);
    formData.append("file", selectedFile);
    // axios
    //   .post(`/${path}Uploads?assignmentId=${asmId}`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: "Bearer " + token,
    //       timeout: 5 * 1000,
    //     },
    //   })
    //   .then((res) => {
    //     setLoading(false);
    //     setUploadFileSuccess(true);
    //   })
    //   .catch((err) => {
    //     if(getStatus(err)=="401") {
    //       clearStorage();
    //     }
    //     setUploadFileFailed(true);
    //     setLoading(false);
    //   });

    toast.promise(
      axios.post(`/${path}Uploads?assignmentId=${asmId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
          timeout: 5 * 1000,
        },
      }),
      {
        loading: "กำลังดำเนินการ...",
        success: (res) => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return "อัปโหลดไฟล์สำเร็จ";
        },
        error: (err) => {
          if (getStatus(err) == "401") {
            clearStorage();
          } else if (getStatus(err) == "413") {
            return "ขนาดไฟล์มีขนาดใหญ่เกินกำหนด";
          } else {
            return "เกิดข้อผิดพลาด กรุณาลองใหม่";
          }
        },
      }
    );
  };

  return (
    <div>
      {assignmentData && (
        <div>
          {assignmentData.map((assignment) => {
            assignmentName.set(assignment.assignmentName, assignment.id);
          })}

          <Stack alignItems="center" spacing={24}>
            <Typography variant="h5" color="#2D95E1">
              ประวัติการส่งงาน
            </Typography>
            <Stack spacing={16}>
              <Stack alignItems="end">
                <Button variant="contained" onClick={() => setOpenModal(true)}>
                  อัปโหลดเอกสาร
                </Button>
              </Stack>
              <Table
                data={data}
                columns={columns}
                linkcolumns={linkColumns}
                linkname={linkName}
              />
            </Stack>
          </Stack>
        </div>
      )}

      <UploadModal
        open={openModal}
        handleClose={handleClose}
        ModalHeader={"อัปโหลดเอกสาร"}
        selectOption={assignmentName}
        setSubmit={submitUpload}
        uploadFile={false}
        isStudentUpload={true}
        uploadFunction={uploadFile}
        selectFile={selectedFile}
        inputLabel={"เลือกประเภทงาน"}
      />
    </div>
  );
}
