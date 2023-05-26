import { Navigate } from "react-router-dom";
import React from "react";

export function clearStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("previousPage")
  localStorage.removeItem("studentId")
  localStorage.removeItem("email")
}

export function getStatus(error) {
  return error.response.status;
}

export default function Auth(props) {
    const token = localStorage.getItem("token")
  
    if (!token) {
      return <Navigate to={"/"} replace={true}></Navigate>
    }
  

  return props.children;
}
