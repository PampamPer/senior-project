import { Alert, Grow, Slide, Snackbar } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

export default function SnackBar(props) {
  const { open, message, severity, handleClose } = props;
  function SlideTransition(props) {
    return <Slide {...props} direction="right" />;
  }
  function GrowTransition(props) {
    return <Grow {...props} />;
  }
  return (
    <Snackbar
      open={Boolean(open)}
      autoHideDuration={1500}
      TransitionComponent={SlideTransition}
      onClose={handleClose}
      // anchorOrigin={{
      //   vertical: "top",
      //   horizontal: "center",
      // }}
    >
      <Alert onClose={handleClose} variant="filled" severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}

SnackBar.propTypes = {
  severity: PropTypes.string.isRequired,
};
