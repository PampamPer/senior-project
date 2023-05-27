import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

export default function CustomizedSelect(props) {
  const { inputLabel, selectOption, setValue } = props;
  const [val, setVal] = useState("");
  const arrSelectOption = [...selectOption];
  const setOnChange = (event) => {
    const selectedVal = event?.target?.value || "";
    setVal(selectedVal);
    setValue(selectedVal);
    // if (setMore != null) {
    //     console.log("setMore success")
    //   setMore(true);
    // }
  };
  return (
    <FormControl fullWidth>
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        label={inputLabel}
        value={val}
        sx={{ p: 0 }}
        onChange={(event) => {
          setOnChange(event);
        }}
      >
        {arrSelectOption ? (
          arrSelectOption.map(([value, key]) => (
            <MenuItem
              key={key}
              value={value}
              sx={{
                // maxWidth: 300,
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
      </Select>
    </FormControl>
  );
}
