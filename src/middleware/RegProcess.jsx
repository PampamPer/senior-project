import { Navigate } from "react-router-dom";
import React from "react";

export default function RegProcess(props) {
    const regProcess = localStorage.getItem("regProcess")
  
    if (!regProcess) {
      return <Navigate to={"/"} replace={true}></Navigate>
    }
  

  return props.children;
}
