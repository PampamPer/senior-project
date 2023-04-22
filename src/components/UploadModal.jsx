import { ClearRounded } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  MenuList,
  Modal,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";

export default function UploadModal(props) {
  const { open, handleClose, ModalHeader, selectOption, setSubmit } = props;
  const [val, setVal] = useState("");

  const setOnChange = (event) => {
    console.log("Is this work?")
    console.log(event.target.value)
    const selectedVal = event?.target?.value || "";
    setVal(selectedVal);
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Stack alignItems="center" sx={{ position: "relative", top: "30%" }}>
        <Paper sx={{ width: 450 }}>
          <Stack spacing={16} sx={{ p: 16 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ p: 8 }}
            >
              <Typography variant="subtitle1" sx={{ mt: 8, ml: 8 }}>
                {ModalHeader}
              </Typography>
              <IconButton onClick={handleClose}>
                <ClearRounded />
              </IconButton>
            </Stack>
            <Divider variant="middle" />
            <Stack alignItems="center">
              <FormControl fullWidth>
                <InputLabel>
                  เลือกโครงงาน
                </InputLabel>
                <Select
                  label="เลือกโครงงาน"
                  value={val}
                  sx={{ width: 300, p:0}}
                  onChange={(event)=>{setOnChange(event)}}
                >
                  {/* <MenuList sx={{ maxWidth: 300, maxHeight: 400 }}> */}
                  {selectOption ? selectOption.map((data, index) => (
                      <MenuItem key={index} value={data}>
                        {data}
                      </MenuItem>
                      
                    )) :
                    <MenuItem value="">--- ไม่พบข้อมูล ---</MenuItem>
                    }
                  {/* </MenuList> */}
                </Select>
              </FormControl>
            </Stack>
            <Button variant="contained" onClick={setSubmit}>
              ยืนยัน
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Modal>
  );
}

UploadModal.propTypes = {
  selectOption: PropTypes.array,
};
