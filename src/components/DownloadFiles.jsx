import React, { useEffect, useContext, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Table, { preprocess } from "./Table";
import { AppContext } from "../App";
import axios from "axios";
import TableSearch from "./TableSearch";
import TableFilter from "./TableFilter";
import CustomTable from "./CustomTable";
import { Stack, Typography } from "@mui/material";

export default function DownloadFiles() {
  const [data, setData] = useState([]);
  const path = localStorage.getItem("projectPath") || "project";
  const { toggle } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    axios
      .get(`/${path}downloads`)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          console.log("get data");
          setData(
            preprocess(
              res.data,
              ["fileName", "downloadLink", "modifiedDate", "fileSize"],
              [],
              ["modifiedDate"]
            )
          );
          setFilteredData(
            preprocess(
              res.data,
              ["fileName", "downloadLink", "modifiedDate", "fileSize"],
              [],
              ["modifiedDate"]
            )
          );
        } else {
          setData([]);
          console.log("dont get data");
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [toggle]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Err: {error.message} </p>;
  }

  const columns = [
    // {
    //   id: "fileName",
    //   label: "ชื่อเอกสาร",
    //   sx: { width: "25%", minWidth: 250 },
    // },
    // { id: "downloadLink", label: "ดาวน์โหลดเอกสาร", sx: { width: "25%" } },
    {
      id: "downloadLink",
      label: "เอกสารสำหรับดาวน์โหลด",
      sx: { width: "25%" },
    },
    {
      id: "modifiedDate",
      label: "แก้ไขล่าสุด",
      sx: { width: "10%", minWidth: 150 },
    },
    { id: "fileSize", label: "ขนาดไฟล์", sx: { width: "5%", minWidth: 100 } },
  ];
  const linkColumns = ["downloadLink"];
  const linkName = "fileName";
  // const linkColumns = [["downloadLink"], ["fileName"]];

  const childToParent = (childdata) => {
    setFilteredData(childdata);
  };

  return (
    <div>
      <NavBar />
      <Stack alignItems="center" sx={{ mt: 24 }}>
        <Typography variant="h4">
          เอกสารสำหรับดาวน์โหลด
        </Typography>
      </Stack>
      <CustomTable
        data={data}
        columns={columns}
        childToParent={childToParent}
        linkcolumns={linkColumns}
        linkname={linkName}
        filteredData={filteredData}
        needFilter={true}
      />
      <Footer />
    </div>
  );
}
