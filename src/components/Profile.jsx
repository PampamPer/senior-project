import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import {
  Avatar,
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
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const username = localStorage.getItem("username");
  const pic = localStorage.getItem("pic");

  const editPassword = () => {
    setOpenEditPW(true);
  };

  const editPhoneNumber = () => {
    setOpenEditPhoneNO(true);
  };

  const editAddress = () => {
    setOpenEditAddress(true);
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
                  <IconButton onClick={editPassword}>
                    <EditRounded />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Modal */}
          <Modal open={openEditPW} onClose={handleClose}>
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ position: "relative", top: "50%" }}
            >
              <Paper sx={{ width: 450 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ px: 8, py: 8 }}
                >
                  <Typography variant="subtitle2" sx={{ mt: 8, ml: 8 }}>
                    แก้ไขรหัสผ่าน
                  </Typography>
                  <IconButton onClick={handleClose}>
                    <ClearRounded />
                  </IconButton>
                </Stack>
                <Divider variant="middle" />
                <PWTextField setPassword={setOldPassword} label={"รหัสผ่านปัจจุบัน"} placeholder={"รหัสผ่านปัจจุบัน"}/>
              </Paper>
            </Stack>
          </Modal>

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
                  <IconButton onClick={editPhoneNumber}>
                    <EditRounded />
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
                  <IconButton onClick={editAddress}>
                    <EditRounded />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
      <Footer />
    </div>
  );
}
