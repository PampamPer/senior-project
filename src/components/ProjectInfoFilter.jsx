import React from "react";
import {
  IconButton,
  Paper,
  Popper,
  FormGroup,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { FilterListSharp } from "@mui/icons-material";
import { useState } from "react";

export default function ProjectInfoFilter(props) {
  const { setFilter } = props;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const [ isChecked, setIsChecked] = useState("relevance");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleOnChange = (event) => {
    let val = event.target.value;
    console.log(val);
    setFilter(val);
    setIsChecked(val);
  }
  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterListSharp />
      </IconButton>

      <Popper open={open} anchorEl={anchorEl}>
        <Paper sx={{ p: 16 }}>
          <Stack spacing={8} sx={{ minWidth: 200, maxWidth: 200 }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={isChecked=="relevance"} color="secondary" value="relevance" onChange={(event)=>handleOnChange(event)}/>}
                label="ทั้งหมด"
              />
              <FormControlLabel
                control={<Checkbox checked={isChecked=="advisor"} color="secondary" value="advisor" onChange={(event)=>handleOnChange(event)}/>}
                label="ที่ปรึกษา"
              />
              <FormControlLabel
                control={<Checkbox checked={isChecked=="committee"} color="secondary" value="committee" onChange={(event)=>handleOnChange(event)}/>}
                label="กรรมการ"
              />
            </FormGroup>
            {/* {console.log("this is default txt from select", defaultText)} */}
          </Stack>
        </Paper>
      </Popper>
    </div>
  );
}
