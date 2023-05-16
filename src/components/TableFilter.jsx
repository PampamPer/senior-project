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

  // We will use query as a search keyword for filtering at each column
  // query is an object that has keys as column names and values as search keywords (null is ignored)
  // e.g. { "no" : "1", "major" : "" ... }
  const [query, setQuery] = useState(
    columns.reduce((result, { id }) => {
      result[id] = "";
      return result;
    }, {})
  );

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
    // console.log("Reset");
    // console.log("query", query);

    // Reset query to empty string of all keys
    setQuery(
      columns.reduce((result, { id }) => {
        result[id] = "";
        return result;
      }, {})
    );
    let newQuery = columns.reduce((result, { id }) => {
      result[id] = "";
      return result;
    }, {});
    onFilter(newQuery);
  };

  const onFilter = (query) => {
    // console.log("IN ON FILTER");
    // console.log("query", query);
    // filter data from query
    let filteredData = data.filter((row) => {
      let isTrue = true;
      for (const [key, value] of Object.entries(query)) {
        if (value !== "") {
          if (
            String(row[key]).toLowerCase().includes(String(value).toLowerCase())
          ) {
            isTrue = true;
          } else {
            isTrue = false;
            break;
          }
        }
      }
      return isTrue;
    });

    // console.log("Before", data);
    // console.log("After", filteredData);

    childToParent(filteredData);
  };

  // onQuery is called when a user selects an option from a dropdown menu
  // This function updates query state, and query is used to filter data
  const onQuery = (event, id) => {
    // console.log("IN ON QUERY");
    // console.log("event.t.v", event.target.value);
    setQuery({ ...query, [id]: event.target.value });
    let newQuery = { ...query, [id]: event.target.value };
    onFilter(newQuery);
  };

  // SelectWrapper is Select component that is used to select an option from a dropdown menu
  // it also contain id and column props for onQuery function to update query state
  const SelectWrapper = ({ id, column, handleSelectChange }) => {
    return (
      <Select
        key={"key_" + column.id}
        labelId={column.id}
        id={"id-" + column.id}
        value={query[column.id]}
        label={column.label}
        onChange={(e) => handleSelectChange(e, id)}
      >
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
      </Select>
    );
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
                <SelectWrapper
                  id={column.id}
                  column={column}
                  handleSelectChange={onQuery}
                />
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
