import { ClearRounded } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PWTextField from "./PasswordTextField";

export default function CustomizedModal(props) {
  const {
    isPassword,
    ModalHeader,
    open,
    handleClose,
    oldLabel,
    newLabel,
    defaultValue,
    setOnChange,
    setOldPassword,
    setNewPassword,
    setRenewPassword,
    setEditOnClick,
  } = props;
  const [isNotEditted, setIsNotEditted] = useState(true);
  const [isOldPWNotEditted, setIsOldPWNotEditted] = useState(true);
  const [isNewPWNotEditted, setIsNewPWNotEditted] = useState(true);
  const [isRenewPWNotEditted, setIsRenewPWNotEditted] = useState(true);
  const [val, setVal] = useState(defaultValue);

  const setOldPW = (password) => {
    setOldPassword(password);
    setIsOldPWNotEditted(false);
  }
  const setNewPW = (password) => {
    setNewPassword(password);
    setIsNewPWNotEditted(false);
  }
  const setRenewPW = (password) => {
    setRenewPassword(password);
    setIsRenewPWNotEditted(false);
  }

  useEffect(() => {
    setIsNotEditted(isOldPWNotEditted || isNewPWNotEditted || isRenewPWNotEditted);
  }, [isOldPWNotEditted, isNewPWNotEditted, isRenewPWNotEditted]);

  const handleCloseToDisable = () => {
    setIsNotEditted(true);
    setIsOldPWNotEditted(true);
    setIsNewPWNotEditted(true);
    setIsRenewPWNotEditted(true);
    handleClose();
  }

  const handleSubmit = () => {
    setIsNotEditted(false);
    setEditOnClick();
  }

  return (
    <Modal open={open} onClose={handleCloseToDisable}>
      <Stack alignItems="center" sx={{ position: "relative", top: "30%" }}>
        <Paper sx={{ width: 450 }}>
          <Stack spacing={16} sx={{ px: 16, py: 16 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ px: 8, py: 8 }}
            >
              <Typography variant="subtitle1" sx={{ mt: 8, ml: 8 }}>
                {ModalHeader}
              </Typography>
              <IconButton onClick={handleCloseToDisable}>
                <ClearRounded />
              </IconButton>
            </Stack>
            <Divider variant="middle" />
            {isPassword ? (
              <Stack spacing={16}>
                <PWTextField
                  setPassword={setOldPW}
                  label={"รหัสผ่านปัจจุบัน"}
                  placeholder={"รหัสผ่านปัจจุบัน"}
                />
                <PWTextField
                  setPassword={setNewPW}
                  label={"รหัสผ่านใหม่"}
                  placeholder={"รหัสผ่านใหม่"}
                />
                <PWTextField
                  setPassword={setRenewPW}
                  label={"ยืนยันรหัสผ่าน"}
                  placeholder={"ยืนยันรหัสผ่าน"}
                />
              </Stack>
            ) : (
              <Stack spacing={16}>
                <TextField
                  multiline
                  label={oldLabel}
                  //onChange={editPassword}
                  defaultValue={defaultValue}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  multiline
                  label={newLabel}
                  onChange={(event) => {setOnChange(event.target.value); setIsNotEditted(false);}}
                />
              </Stack>
            )}
            <Button variant="contained" onClick={setEditOnClick} disabled={isNotEditted}>
              ยืนยัน
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Modal>
  );
}
