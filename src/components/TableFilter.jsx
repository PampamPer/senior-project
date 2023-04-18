import { CloseRounded, FilterListSharp } from "@mui/icons-material";
import {
  Button,
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
import { useEffect, useState } from "react";

export function getUniqueOptions(arr, key) {
  return [...new Set(arr.map((item) => item[key]))];
}

export default function TableFilter(props) {
  const { data, columns, childToParent, linkcolumns, linkname } = props;
  const [defaultText, setDefaultText] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const [newData, setNewData] = useState();
  let option = {};
  const filterOption = (data) => {
    Object.keys(data[0]).forEach((column) => {
      option[column] = getUniqueOptions(data, column);
    });
    option[linkcolumns[0]]
    console.log("option", option);
    setNewData(option);
  };
  useEffect(() => {
    filterOption(data);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  // console.log("this is data", data);

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = (event) => {
    setDefaultText("");
    onFilter(event);
  };

  const onFilter = (event) => {
    setDefaultText(event.target.value);
    let defaultText = event.target.value;
    // console.log("this is default txt", defaultText);
    const filteredData = data.filter((keyword) => {
      let isTrue = false;
      for (const value of Object.values(keyword)) {
        // console.log("this is val", defaultText);
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
                  key={column.id}
                  labelId={column.id}
                  id={"id-" + column.id}
                  value={defaultText}
                  label={column.label}
                  onChange={onFilter}
                >
                  {console.log("col", column)}
                  {console.log("new data", newData)}
                  {newData?.[column.id].map((item, index) => (
                    
                    <MenuItem key={item} value={item}>
                      {linkcolumns.includes(column.id)
                        ? newData?.[linkname][index]
                        :item}
                        {/* {item} */}
                          
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
