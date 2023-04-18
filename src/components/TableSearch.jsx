import {
  Button,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

export default function TableSearch(props) {
  const { data, childToParent } = props;
  const [defaultText, setDefaultText] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const onSearch = (event) => {
    setDefaultText(event.target.value);
    let defaultText = event.target.value;
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

  const isOnSearched = () => {
    // setIsSearched((previousIsSearched) => !previousIsSearched);
    setIsSearched(true);
  };

  const cancelSearch = () => {
    setDefaultText("");
    setIsSearched(false);
    childToParent([...data]);
  };

  return (
    <div>
      <ClickAwayListener onClickAway={() => setIsSearched(false)}>
        <TextField
          id="dowloadtable search"
          label="ค้นหา"
          variant="standard"
          value={defaultText}
          onChange={onSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {isSearched && (
                  <IconButton
                    onClick={cancelSearch}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </ClickAwayListener>
    </div>
  );
}

TableSearch.propTypes = {
  data: PropTypes.array,
};
