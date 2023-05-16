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
  const {
    open,
    handleClose,
    ModalHeader,
    selectOption,
    setSubmit,
    uploadFile,
    uploadFunction,
    selectFile,
    isStudentUpload,
    inputLabel
  } = props;
  const [val, setVal] = useState("");
  const arrSelectOption = [...selectOption];
  const [isNotSelected, setIsNotSelected] = useState(true);
  const [projSelected, setProjSelected] = useState(false);
  const [filedSelected, setFileSelected] = useState(false);

  const setOnChange = (event) => {
    const selectedVal = event?.target?.value || "";
    setVal(selectedVal);
    if(isStudentUpload){
      if(filedSelected){
        setIsNotSelected(false);
      }
      else{
        setProjSelected(true);
      }
    }
    else{
      setIsNotSelected(false);
    }
  };

  const handleUploadOnChange = (event) => {
    uploadFunction(event);
    setIsNotSelected(false);
    if(!projSelected){
      setIsNotSelected(true);
      setFileSelected(true);
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Stack alignItems="center" sx={{ position: "relative", top: "30%" }}>
        <Paper sx={{ width: 332 }}>
          <Stack spacing={16} sx={{ p: 16 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ p: 8 }}>
              <Typography variant="subtitle1" sx={{ mt: 8, ml: 8 }}>
                {ModalHeader}
              </Typography>
              <IconButton onClick={handleClose}>
                <ClearRounded />
              </IconButton>
            </Stack>
            <Divider variant="middle" />
            {uploadFile ? (
              <Stack alignItems="center" spacing={12}>
                <Button variant="outlined" component="label">
                  อัปโหลดเอกสาร
                  <input
                    hidden
                    accept=".pdf, .jpg, .jpeg, .png"
                    type="file"
                    onChange={(event) => {
                      uploadFunction(event);
                      setIsNotSelected(false);
                    }}
                  />
                </Button>
                {selectFile && (
                  <Typography variant="body2">{selectFile.name}</Typography>
                )}
              </Stack>
            ) : (
              <Stack alignItems="center" spacing={16}>
                <FormControl fullWidth>
                  <InputLabel>{inputLabel}</InputLabel>
                  <Select
                    label={inputLabel}
                    value={val}
                    sx={{ width: 300, p: 0 }}
                    onChange={(event) => {
                      setOnChange(event);
                    }}
                  >
                    {/* <MenuList sx={{ maxWidth: 300, maxHeight: 400 }}> */}
                    {arrSelectOption ? (
                      arrSelectOption.map(([value, key]) => (
                        <MenuItem
                          key={key}
                          value={value}
                          sx={{
                            maxWidth: 300,
                            display: "block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {value}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">--- ไม่พบข้อมูล ---</MenuItem>
                    )}
                    {/* </MenuList> */}
                  </Select>
                </FormControl>
                {isStudentUpload && (
                  <Stack alignItems="center" spacing={8}> 
                    <Button variant="outlined" component="label">
                      อัปโหลดเอกสาร
                      <input
                        hidden
                        accept=".pdf, .jpg, .jpeg, .png"
                        type="file"
                        onChange={handleUploadOnChange}
                      />
                    </Button>
                    {selectFile && (
                      <Typography variant="body2">{selectFile.name}</Typography>
                    )}
                  </Stack>
                )}
              </Stack>
            )}

            <Button
              variant="contained"
              onClick={() => setSubmit(val)}
              disabled={isNotSelected}
            >
              ยืนยัน
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Modal>
  );
}
