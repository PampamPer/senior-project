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

export default function Profile() {
  const [data, setData] = useState();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const { setIsLogged } = useContext(AppContext);
  const formData = new FormData();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    console.log(resData.profilePicture)
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
          setIsLogged(true);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const editPassword = () => {
    setOldPassword(newPassword);
    axios
      .put(
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
      )
      .then((res) => {
        setLoading(false);
        alert("Change password Success!");
        setOpenEditPW(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const editPhoneNumber = () => {
    setShowedPhoneNo(phoneNo);
    axios
      .put(
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
      )
      .then((res) => {
        setLoading(false);
        alert("edit phone number Success!");
        setOpenEditPhoneNO(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const editAddress = () => {
    setShowedAddress(address);
    axios
      .put(
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
      )
      .then((res) => {
        setLoading(false);
        alert("edit address Success!");
        setOpenEditAddress(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const uploadPicture = (event) => {
    const newPic = event.target.files[0];
    setPicture(URL.createObjectURL(newPic));
    formData.append("file", newPic);
    editPicture();
  };

  const editPicture = () => {
    axios
      .put(
        `/personalinfo/${role}/editpicture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
            timeout: 5 * 1000,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        alert("Upload Profile pic Success!");
        setOpenEditPW(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Err: {error.message} </p>;
  }

  return (
    <Stack className="content" gap={60}>
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
                  showedPhoneNo == null ? "phone number" : showedPhoneNo
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
                defaultValue={phoneNo == null ? "phone number" : phoneNo}
                setOnChange={setPhoneNo}
                setOldPassword=""
                setNewPassword=""
                setEditOnClick={editPhoneNumber}
              />

              {role == "student" &&<Typography variant="subtitle2">ที่อยู่</Typography>}

              {role == "student" && (
                <TextField
                  multiline
                  sx={{ width: 255 }}
                  value={showedAddress == null ? "address" : showedAddress}
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
                defaultValue={address == null ? "address" : address}
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
