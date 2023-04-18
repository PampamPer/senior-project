import React from "react";
import { IconButton, Paper, Popper, FormGroup, Stack, FormControlLabel } from "@mui/material";
import { CheckBox, FilterListSharp } from "@mui/icons-material";
import { useState } from "react";

export default function ProjectInfoFilter() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
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
                control={<Checkbox defaultChecked />}
                label="Label"
              />
              <FormControlLabel
                disabled
                control={<Checkbox />}
                label="Disabled"
              />
            </FormGroup>
            {/* {console.log("this is default txt from select", defaultText)} */}
          </Stack>
        </Paper>
      </Popper>
    </div>
  );
}
