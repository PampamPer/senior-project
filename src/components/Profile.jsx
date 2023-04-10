import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import {
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ClearRounded, EditRounded, PhotoCamera } from "@mui/icons-material";
import PWTextField from "./PasswordTextField";
import CustomizedModal from "./Modal";

export default function Profile() {
  const [data, setData] = useState();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEditPW, setOpenEditPW] = useState(false);
  const [openEditPhoneNO, setOpenEditPhoneNO] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");

  const username = localStorage.getItem("username");
  const pic = localStorage.getItem("pic");

  const editPassword = () => {
    alert(newPassword);
  };

  const editPhoneNumber = () => {
    alert(phoneNo);
  };

  const editAddress = () => {
    alert(address);
  };

  const handleClose = () => {
    setOpenEditPW(false);
    setOpenEditPhoneNO(false);
    setOpenEditAddress(false);
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
      // .get('/proposaltimelines?semesterid=1')
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          console.log("get data");
          setData(res.data);
        } else {
          setData([]);
          console.log("dont get data");
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Err: {error.message} </p>;
  }

  return (
    <div>
      <NavBar />
      <Stack
        direction="row"
        sx={{ backgroundColor: "green", borderRadius: 4, overflow: "hidden" }}
      >
        <Stack
          alignItems="center"
          paddingX={32}
          paddingY={24}
          spacing={12}
          sx={{ backgroundColor: "#243460" }}
        >
          <Container sx={{ position: "relative" }}>
            <Avatar
              src="src\assets\mclogo.svg"
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
              <input hidden accept="image/*" type="file" />
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
            defaultValue={data.email}
            InputProps={{
              readOnly: true,
            }}
          ></TextField>
          <Typography variant="subtitle2">รหัสผ่าน</Typography>
          <TextField
            //onChange={editPassword}
            sx={{ width: 255 }}
            type="password"
            defaultValue={data.password == null ? "password" : data.password}
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
            setEditOnClick={editPassword}
          />

          <br />
          <Typography variant="subtitle1">ข้อมูลส่วนตัว</Typography>
          <Typography variant="subtitle2">เบอร์โทรศัพท์</Typography>

          <TextField
            //onChange={editPassword}
            sx={{ width: 255 }}
            defaultValue={
              data.phoneNumber == null ? "phone number" : data.phoneNumber
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
            defaultValue=""
            setOnChange={setPhoneNo}
            setOldPassword=""
            setNewPassword=""
            setEditOnClick={editPhoneNumber}
          />

          <Typography variant="subtitle2">ที่อยู่</Typography>

          <TextField
            //onChange={editPassword}
            sx={{ width: 255 }}
            defaultValue={data.address == null ? "address" : data.address}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={()=>setOpenEditAddress(true)}>
                    <EditRounded />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* Edit Address Modal */}
          <CustomizedModal
            isPassword={false}
            ModalHeader="แก้ไขที่อยู่"
            open={openEditAddress}
            handleClose={handleClose}
            oldLabel="ที่อยู่ปัจจุบัน"
            newLabel="ที่อยู่ใหม่"
            defaultValue=""
            setOnChange={setAddress}
            setOldPassword=""
            setNewPassword=""
            setEditOnClick={editAddress}
          />
        </Stack>
      </Stack>
      <Footer />
    </div>
  );
}
