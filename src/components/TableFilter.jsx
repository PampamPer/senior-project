import { CloseRounded, FilterListSharp } from "@mui/icons-material";
import {
  Button,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Popper,
  Select,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

export default function TableFilter(props) {
  const { data, columns, childToParent } = props;
  const [defaultText, setDefaultText] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = (event) => {
    setDefaultText("");
    onFilter(event)
  }

  const onFilter = (event) => {
    setDefaultText(event.target.value);
    let defaultText = event.target.value;
    console.log("this is default txt", defaultText);
    const filteredData = data.filter((keyword) => {
      let isTrue = false;
      for (const value of Object.values(keyword)) {
        console.log("this is val", defaultText);
        if (String(value).includes(defaultText)) {
          isTrue = true;
          break;
        }
      }
      return isTrue;
    });
    childToParent(filteredData);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterListSharp />
      </IconButton>

      <Popper open={open} anchorEl={anchorEl}>
        <Paper sx={{ p: 16 }}>
          <Stack spacing={8} sx={{ minWidth: 200, maxWidth: 200 }}>
            <Stack direction="row-reverse">
              <IconButton onClick={handleClose}>
                <CloseRounded />
              </IconButton>
              <Button onClick={handleReset}>Reset</Button>
            </Stack>
            {columns.map((column) => (
              <FormControl fullWidth>
                <InputLabel id={column.id}>{column.label}</InputLabel>
                <Select
                  labelId={column.id}
                  id={"id-" + column.id}
                  value={defaultText}
                  label={column.label}
                  onChange={onFilter}
                >
                  {data.map((item) => (
                    <MenuItem key={item.id} value={item[column.id]}>
                      {item[column.id]}
                    </MenuItem>
                  ))}
                </Select>
                {/* {console.log("this is default txt from select", defaultText)} */}
              </FormControl>
            ))}
          </Stack>
        </Paper>
      </Popper>
    </div>
  );
}

TableFilter.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
};
