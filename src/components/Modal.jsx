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
import React from "react";
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
    setEditOnClick,
  } = props;

  return (
    <Modal open={open} onClose={handleClose}>
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
              <IconButton onClick={handleClose}>
                <ClearRounded />
              </IconButton>
            </Stack>
            <Divider variant="middle" />
              {isPassword ? (
                <Stack spacing={16}>
                  <PWTextField
                    setPassword={setOldPassword}
                    label={"รหัสผ่านปัจจุบัน"}
                    placeholder={"รหัสผ่านปัจจุบัน"}
                  />
                  <PWTextField
                    setPassword={setNewPassword}
                    label={"รหัสผ่านใหม่"}
                    placeholder={"รหัสผ่านใหม่"}
                  />
                </Stack>
              ) : (
                <Stack spacing={16}>
                  <TextField
                    label={oldLabel}
                    //onChange={editPassword}
                    defaultValue={defaultValue}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label={newLabel}
                    onChange={(event) => setOnChange(event.target.value)}
                  />
                </Stack>
              )}
            <Button variant="contained" onClick={setEditOnClick}>
              ยืนยัน
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Modal>
  );
}
