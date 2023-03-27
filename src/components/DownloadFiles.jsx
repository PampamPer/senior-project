import React, { useEffect, useContext, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Table, { preprocess } from "./Table";
import { AppContext } from "../App";
import axios from "axios";

export default function DownloadFiles() {
  const [data, setData] = useState([]);
  const path = localStorage.getItem("projectPath") || "project";
  const { toggle } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/${path}downloads`)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          console.log("get data");
          setData(
            preprocess(res.data, [
              "fileName",
              "downloadLink",
              "modifiedDate",
              "fileSize",
            ])
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
    { id: "fileName", label: "ชื่อเอกสาร", sx: { width: "25%" } },
    { id: "downloadLink", label: "ดาวน์โหลดเอกสาร", sx: { width: "25%" } },
    { id: "modifiedDate", label: "แก้ไขล่าสุด", sx: { width: "10%" } },
    { id: "fileSize", label: "ขนาดไฟล์", sx: { width: "5%" } },
  ];
  const linkColumns = ["downloadLink"];

  return (
    <div>
      <NavBar />
      <Table data={data} columns={columns} linkcolumns={linkColumns} />
      <Footer />
    </div>
  );
}
