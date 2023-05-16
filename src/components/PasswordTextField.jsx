import { useState } from "react";
import "../App.css";
import { IconButton, Snackbar, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PWTextField(props) {
  const { setPassword, label, placeholder, handleKeyPress } = props
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);


  return (
        <TextField
          placeholder={placeholder}
          label={label}
          onChange={(event) => {setPassword(event.target.value);}}
          onKeyPress={handleKeyPress}
          type={showPassword ? "string" : "password"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
  );
}

