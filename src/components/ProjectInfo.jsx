import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Table from "./Table";

export default function ProjectInfo() {
  // ยังไม่ได้เพิ่ม Bearer tokens + หน้าอัปโหลดโครงงาน
  const [data, setData] = useState([]);
  const path = localStorage.getItem("projectPath") || "project";
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const { toggle, semesterId } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        `/${path}info/${role}?semesterid=${semesterId}`,
        // "/proposalinfo/student?semesterid=1",
        {
          headers: {
            Authorization:
              "Bearer " +
              token,
            timeout: 5 * 1000,
          },
        }
      )
      // .get('/proposaltimelines?semesterid=1')
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data) {
          console.log("get data");
          setData(res.data);
          console.log(typeof(data));
        } else {
          setData([]);
          console.log("dont get data");
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [toggle, semesterId]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Err: {error.message} </p>;
  }

  return (
    <div>
      <NavBar />
      {/* <Table
        data={data}
        columns={[
          "หมายเลขโครงงาน",
          "ภาควิชา",
          "ชื่อโครงงานภาษาไทย",
          "ชื่อโครงงานภาษาอังกฤษ",
          "ภาคการศึกษา",
          "อาจารย์ที่ปรึกษาโครงงาน 1",
          "อาจารย์ที่ปรึกษาโครงงาน 2",
          "กรรมการ 1",
          "กรรมการ 2",
          "สมาชิกโครงงาน 1",
          "สมาชิกโครงงาน 2",
          "สมาชิกโครงงาน 3",
          "ผลการศึกษาสมาชิกคนที่ 1",
          "ผลการศึกษาสมาชิกคนที่ 2",
          "ผลการศึกษาสมาชิกคนที่ 3",
        ]}
      /> */}
      <Footer />
    </div>
  );
}
