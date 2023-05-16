import { FilterListSharp } from "@mui/icons-material";
import {
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Popper,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

export default function TableFilter(props) {
  const { data, childToParent } = props;
  const [defaultText, setDefaultText] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const onFilter = (event) => {
    setDefaultText(event.target.value);
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
      <Popper open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <FormControl>
              <FormControlLabel label="Check 1" control={<Checkbox />} />
            </FormControl>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

TableFilter.propTypes = {
  data: PropTypes.array,
};
