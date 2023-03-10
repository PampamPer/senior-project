import AppBar from "@mui/material/AppBar";
import { useState, useContext } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Select, MenuItem, Switch, Toolbar, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function NavBar() {
  const { toggle, setToggle, semesterId, setSemesterId, isLogged } =
    useContext(AppContext);

  const handleOnChangeToggle = (event) => {
    const isChecked = event.target.checked;
    setToggle(isChecked);
    localStorage.setItem("projectPath", isChecked ? "project" : "proposal");
  };

  const handleOnChangeSemester = (event) => {
    const semId = event.target.value;
    setSemesterId(semId);
    localStorage.setItem("semesterId", semId);
  };

  let navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HomeIcon sx={{ width: 32, height: 32, color: "#0075FF" }} />
          <div>
            <Button variant="text" onClick={() => navigate("/main")}>
              หน้าแรก
            </Button>
            <Button variant="text">ตารางสรุป</Button>
            <Button variant="text">เอกสารสำหรับดาวน์โหลด</Button>
            {isLogged && <Button variant="text">ข้อมูลโครงงาน</Button>}
          </div>
          <Button variant="contained" onClick={() => navigate("/sign-in")}>
            LOGIN
          </Button>
        </Toolbar>
      </Container>

      <Container maxWidth="xl" sx={{ backgroundColor: "#CCCCCC" }}>
        <Toolbar disableGutters>
          <div>
            <Select value={semesterId} onChange={handleOnChangeSemester}>
              <MenuItem value={2}>2565/2</MenuItem>
              <MenuItem value={1}>2565/1</MenuItem>
            </Select>
            <Switch checked={toggle} onChange={handleOnChangeToggle} />
            {toggle? 'project' : 'proposal'}
          </div>
          <Button variant="outlined" onClick={() => navigate("/faq")}>FAQ</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
