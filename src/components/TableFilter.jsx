import { CloseRounded, FilterListSharp } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  MenuList,
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
    option[linkcolumns[0]];
    setNewData(option);
  };
  useEffect(() => {
    filterOption(data);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

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
    const filteredData = data.filter((keyword) => {
      let isTrue = false;
      for (const value of Object.values(keyword)) {
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
        <Paper sx={{ px: 16, pb: 16, maxHeight: 300, overflowY: "scroll" }}>
          <Stack spacing={8} sx={{ minWidth: 200, maxWidth: 200 }}>
            <Stack
              direction="row"
              justifyContent="end"
              alignItems="center"
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 2,
                backgroundColor: "white",
                py: 16,
                height: 50,
              }}
            >
              <Button onClick={handleReset}>Reset</Button>
              <IconButton onClick={handleClose} sx={{ width: 24, height: 24 }}>
                <CloseRounded />
              </IconButton>
            </Stack>
            {columns.map((column) => (
              <FormControl fullWidth key={column.id}>
                <InputLabel id={column.id} key={column.id} sx={{ pr: 32 }}>
                  {column.label}
                </InputLabel>
                <Select
                  key={"key_" + column.id}
                  labelId={column.id}
                  id={"id-" + column.id}
                  value={defaultText}
                  label={column.label}
                  onChange={onFilter}
                >
                  {/* <MenuList sx={{maxHeight:300}}> */}
                  {newData?.[column.id].map((item, index) => (
                    <MenuItem
                      key={item}
                      value={item}
                      sx={{
                        maxWidth: 200,
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {linkcolumns.includes(column.id)
                        ? newData?.[linkname][index]
                        : item}
                    </MenuItem>
                  ))}
                  {/* </MenuList> */}
                </Select>
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
