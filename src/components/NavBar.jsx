import AppBar from "@mui/material/AppBar";
import { useState, useContext, useRef, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import {
  Select,
  MenuItem,
  Switch,
  Toolbar,
  Button,
  MenuList,
  Popper,
  ClickAwayListener,
  Paper,
  Grow,
} from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { AppContext } from "../App";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const { toggle, setToggle, semesterId, setSemesterId, isLogged, setIsLogged } =
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
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HomeIcon sx={{ width: 32, height: 32, color: "#0075FF" }} />
          <div>
            <Button variant="text" onClick={() => navigate("/main")}>
              หน้าแรก
            </Button>
            {isLogged && (
              <Button variant="text" onClick={() => navigate("/project-info")}>
                ข้อมูลโครงงาน
              </Button>
            )}
            <Button variant="text" onClick={() => navigate("/summary-table")}>ตารางสรุป</Button>
            <Button variant="text" onClick={() => navigate("/download-files")}>
              เอกสารสำหรับดาวน์โหลด
            </Button>
          </div>
          {!isLogged && (
            <Button variant="contained" onClick={() => navigate("/sign-in")}>
              LOGIN
            </Button>
          )}
          {isLogged && (
            <div>
              <Button
                ref={anchorRef}
                id="composition-button"
                variant="contained"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                {localStorage.getItem("username")}
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                style={{ zIndex: 1301 }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem
                            onClick={() => {
                              handleClose;
                              navigate("/profile");
                            }}
                            autoFocus="true"
                          >
                            ข้อมูลผู้ใช้งาน
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleClose;
                              setIsLogged(false);
                              navigate("/main");
                              localStorage.setItem("token", "");
                            }}
                            autoFocus="true"
                          >
                            ออกจากระบบ
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          )}
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
            {toggle ? "project" : "proposal"}
          </div>
          <Button variant="outlined" onClick={() => navigate("/faq")}>
            FAQ
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
