import { IconButton, InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

export default function TableSearch(props) {
  const { data, childToParent } = props;
  const [defaultText, setDefaultText] = useState("");

  const onSearch = (event) => {
    setDefaultText(event.target.value)
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

  const cancelSearch = () => {
    setDefaultText("");
    childToParent([... data])
  };

  return (
    <div>
      <TextField
        id="dowloadtable search"
        label="ค้นหา"
        variant="standard"
        value={defaultText}
        onChange={onSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                // aria-label="toggle password visibility"
                onClick={cancelSearch}
              >
                <ClearIcon/>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

TableSearch.propTypes = {
  data: PropTypes.array,
};
