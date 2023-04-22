import React, { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Stack, Typography } from "@mui/material";
import ProjectInfoLecturer from "./ProjectInfoLecturer";
import ProjectInfoStudent from "./ProjectInfoStudent";

export default function ProjectInfo() {
  const role = localStorage.getItem("role");

  return (
    <div>
      <NavBar />
      <Stack alignItems="center" sx={{ my: 24 }}>
        <Typography variant="h4">ข้อมูลโครงงาน</Typography>
      </Stack>
      {role == "lecturer" ? (
        <ProjectInfoLecturer/>
      ) : (
        <ProjectInfoStudent/>
      )}

      <Footer />
    </div>
  );
}
