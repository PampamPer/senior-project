import NavBar from "./NavBar";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Table from "./Table";
import { AppContext } from "../App";
import Footer from "./Footer";


export default function SummaryTable() {
  const [data, setData] = useState([]);
  const [lineQR, setQR] = useState([]);
  const path = localStorage.getItem("projectPath") || "project";
  const { toggle, semesterId } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/${path}summary?semesterid=${semesterId}`)
      // .get('/proposaltimelines?semesterid=1')
      .then((res) => {
        console.log("this is res.data", res.data);
        setLoading(false);
        if (res.data) {
          console.log("get data");
          setData(res.data);
          console.log("this is data", data);
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

  useEffect(() => {
    axios
      .get(`/linegroups/${path}`)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setQR(res.data);
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
          "งานที่ส่งล่าสุด",
          "ลิงก์ดาวน์โหลดเอกสาร",
          "ส่งงานล่าสุด",
        ]}
      /> */}
      <Footer />
    </div>
  );
}
