import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import {
  Avatar,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { EditRounded, PhotoCamera } from "@mui/icons-material";
import CustomizedModal from "./Modal";
import { AppContext } from "../App";
import { clearStorage, getStatus } from "../middleware/Auth";
import { toast } from "react-hot-toast";

export default function Profile() {
  const [data, setData] = useState();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const formData = new FormData();
  const [loading, setLoading] = useState(true);
  const [openEditPW, setOpenEditPW] = useState(false);
  const [openEditPhoneNO, setOpenEditPhoneNO] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [renewPassword, setRenewPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState("");

  const [showedPhoneNo, setShowedPhoneNo] = useState();
  const [showedAddress, setShowedAddress] = useState();

  const handleClose = () => {
    setOpenEditPW(false);
    setOpenEditPhoneNO(false);
    setOpenEditAddress(false);
    setPhoneNo(data.phoneNumber);
    setOldPassword(data.password);
    setNewPassword(data.password);
    setAddress(data.address);
  };

  const setDefault = (resData) => {
    setPhoneNo(resData.phoneNumber);
    setOldPassword(resData.password);
    setNewPassword(resData.password);
    setAddress(resData.address);
    setPicture(resData.profilePicture);
    setShowedAddress(resData.address);
    setShowedPhoneNo(resData.phoneNumber);
  };

  useEffect(() => {
    axios
      .get(
        `/personalinfo/${role}`,
        // "/proposalinfo/student?semesterid=1",
        {
          headers: {
            Authorization: "Bearer " + token,
            timeout: 5 * 1000,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        if (res.data) {
          setData(res.data);
          setDefault(res.data);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        if (getStatus(err) == "401") {
          clearStorage();
        } else {
          toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
          setLoading(false);
        }
      });
  }, []);

  const hasLowerCaseLetters = (inputValue) => {
    const regex = /[a-z]/;
    return regex.test(inputValue);
  };

  const hasUpperCaseLetters = (inputValue) => {
    const regex = /[A-Z]/;
    return regex.test(inputValue);
  };

  const hasNumericLetters = (inputValue) => {
    const regex = /[0-9]/;
    return regex.test(inputValue);
  };

  const hasSpecialCharacters = (inputValue) => {
    const regex = /[-+_!@#$%^&*., ?]/;
    return regex.test(inputValue);
  };

  const editPassword = () => {
    setOldPassword(newPassword);
    if (newPassword.length < 8) {
      toast.error("ต้องมีความยาวตั้งแต่ 8 ตัวอักษรขึ้นไป");
    } else if (!hasLowerCaseLetters(newPassword) || !hasUpperCaseLetters(newPassword) || !hasNumericLetters(newPassword)) {
      toast.error("ต้องประกอบด้วย a-z. A-Z และ 0-9");
    }
    else if (!hasSpecialCharacters(newPassword)) {
      toast.error("ต้องประกอบด้วยตัวอักษรพิเศษ");
    }
    else {
      toast.promise(
        axios.put(
          `/personalinfo/${role}/editpassword`,
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmNewPassword: renewPassword,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              timeout: 5 * 1000,
            },
          }
        ),
        {
          loading: "กำลังดำเนินการ...",
          success: (res) => {
            setOpenEditPW(false);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            return "แก้ไขรหัสผ่านสำเร็จ";
          },
          error: (err) => {
            if (getStatus(err) == "401") {
              clearStorage();
            } else {
              return "ไม่สามารถแก้ไขรหัสผ่านได้";
            }
          },
        }
      );
    }
  };

  const editPhoneNumber = () => {
    setShowedPhoneNo(phoneNo);
    toast.promise(
      axios.put(
        `/personalinfo/${role}/editphone`,
        {
          phone: phoneNo,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            timeout: 5 * 1000,
          },
        }
      ),
      {
        loading: "กำลังดำเนินการ...",
        success: (res) => {
          setOpenEditPhoneNO(false);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return "แก้ไขเบอร์โทรศัพท์สำเร็จ";
        },
        error: (err) => {
          if (getStatus(err) == "401") {
            clearStorage();
          } else {
            return "ไม่สามารถแก้ไขเบอร์โทรศัพท์ได้";
          }
        },
      }
    );
  };

  const editAddress = () => {
    setShowedAddress(address);
    toast.promise(
      axios.put(
        `/personalinfo/${role}/editaddress`,
        {
          address: address,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            timeout: 5 * 1000,
          },
        }
      ),
      {
        loading: "กำลังดำเนินการ...",
        success: (res) => {
          setOpenEditAddress(false);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return "แก้ไขที่อยู่สำเร็จ";
        },
        error: (err) => {
          if (getStatus(err) == "401") {
            clearStorage();
          } else {
            return "ไม่สามารถแก้ไขที่อยู่ได้";
          }
        },
      }
    );
  };

  const uploadPicture = (event) => {
    const newPic = event.target.files[0];
    setPicture(URL.createObjectURL(newPic));
    formData.append("file", newPic);
    editPicture();
  };

  const editPicture = () => {
    toast.promise(
      axios.put(`/personalinfo/${role}/editpicture`, formData, {
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
          return "แก้ไขรูปโปรไฟล์สำเร็จ";
        },
        error: (err) => {
          if (getStatus(err) == "401") {
            clearStorage();
          } else if (getStatus(err) == "413") {
            return "ขนาดไฟล์ต้องมีขนาดไม่เกิน 10 mb";
          } else {
            return "ไม่สามารถแก้ไขรูปโปรไฟล์ได้";
          }
        },
      }
    );
  };

  if (loading) {
    return <p>loading...</p>;
  }

  // if (error) {
  //   return <p>Err: {error.message} </p>;
  // }

  return (
    <Stack className="content" gap={96}>
      <NavBar />
      <Stack alignItems="center">
        <Paper
          elevation={4}
          sx={{ overflow: "hidden", minWidth: 524, borderRadius: 4 }}
        >
          <Stack
            direction="row"
            // sx={{ borderRadius: 4, overflow: "hidden", width: 524 }}
          >
            <Stack
              alignItems="center"
              paddingX={32}
              paddingY={24}
              spacing={12}
              sx={{
                background: "linear-gradient(to bottom, #373B44, #4286f4)",
              }}
            >
              <Container sx={{ position: "relative" }}>
                <Avatar
                  // src={picture == null ? "srcassetsmclogo.svg" : picture}
                  src={picture}
                  sx={{ backgroundColor: "grey", height: 160, width: 160 }}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  disableRipple //ต้องแก้ให้ hover แล้วมี effect
                  sx={{
                    backgroundColor: "white",
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                  }}
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => uploadPicture(event)}
                  />
                  <PhotoCamera />
                </IconButton>
              </Container>
              <br />
              <Typography variant="body1" sx={{ color: "#FFD600" }}>
                {data.id}
              </Typography>
              <Typography variant="body1" sx={{ color: "white" }}>
                {data.fullName}
              </Typography>
            </Stack>
            <Stack p={24} spacing={4} sx={{ backgroundColor: "white" }}>
              <Typography variant="subtitle1">ข้อมูลผู้ใช้</Typography>
              <Typography variant="subtitle2">อีเมล</Typography>
              <TextField
                sx={{ width: 255 }}
                value={data.email}
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
              <Typography variant="subtitle2">รหัสผ่าน</Typography>
              <TextField
                sx={{ width: 255 }}
                type="password"
                value={
                  // data.password == null ? "password" : data.password
                  oldPassword == null ? "password" : oldPassword
                }
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setOpenEditPW(true)}>
                        <EditRounded />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Edit PW Modal */}
              <CustomizedModal
                isPassword={true}
                ModalHeader="แก้ไขรหัสผ่าน"
                open={openEditPW}
                handleClose={handleClose}
                oldLabel="รหัสผ่านเดิม"
                newLabel="รหัสผ่านใหม่"
                defaultValue=""
                setOnChange=""
                setOldPassword={setOldPassword}
                setNewPassword={setNewPassword}
                setRenewPassword={setRenewPassword}
                setEditOnClick={editPassword}
              />

              <br />
              <Typography variant="subtitle1">ข้อมูลส่วนตัว</Typography>
              <Typography variant="subtitle2">เบอร์โทรศัพท์</Typography>

              <TextField
                sx={{ width: 255 }}
                value={
                  // data.phoneNumber == null ? "phone number" : data.phoneNumber
                  showedPhoneNo == null ? "-" : showedPhoneNo
                }
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setOpenEditPhoneNO(true)}>
                        <EditRounded />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Edit Phone Number Modal */}
              <CustomizedModal
                isPassword={false}
                ModalHeader="แก้ไขเบอร์โทรศัพท์"
                open={openEditPhoneNO}
                handleClose={handleClose}
                oldLabel="เบอร์โทรศัพท์เดิม"
                newLabel="เบอร์โทรศัพท์ใหม่"
                defaultValue={phoneNo == null ? "-" : phoneNo}
                setOnChange={setPhoneNo}
                setOldPassword=""
                setNewPassword=""
                setEditOnClick={editPhoneNumber}
              />

              {role == "student" && (
                <Typography variant="subtitle2">ที่อยู่</Typography>
              )}

              {role == "student" && (
                <TextField
                  multiline
                  sx={{ width: 255 }}
                  value={showedAddress == null ? "-" : showedAddress}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setOpenEditAddress(true)}>
                          <EditRounded />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              {/* Edit Address Modal */}
              <CustomizedModal
                isPassword={false}
                ModalHeader="แก้ไขที่อยู่"
                open={openEditAddress}
                handleClose={handleClose}
                oldLabel="ที่อยู่ปัจจุบัน"
                newLabel="ที่อยู่ใหม่"
                defaultValue={address == null ? "-" : address}
                setOnChange={setAddress}
                setOldPassword=""
                setNewPassword=""
                setEditOnClick={editAddress}
              />
            </Stack>
          </Stack>
        </Paper>
      </Stack>
      <Footer />
    </Stack>
  );
}
