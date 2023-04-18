import NavBar from "./NavBar";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Button, Link, Paper, Typography } from "@mui/material";
import Table, { preprocess } from "./Table";
import { AppContext } from "../App";
import Footer from "./Footer";
import { Stack } from "@mui/system";
import CustomizedTimeline from "./Timeline";

export default function Main() {
  const [data, setData] = useState([]);
  const [lineQR, setQR] = useState([]);
  const path = localStorage.getItem("projectPath") || "project";
  const { toggle, semesterId } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  


  useEffect(() => {
    axios
      .get(`/${path}timelines?semesterid=${semesterId}`)
      .then((res) => {
        setLoading(false);
        if (res.data) {
          // console.log("get data");
          setData(preprocess(res.data, ["deadline", "todo"], ["deadline"], []));
        } else {
          setData([]);
          // console.log("dont get data");
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });

      axios
      .get(`/linegroups/${path}`)
      .then((res) => {
        // console.log(res.data);
        setLoading(false);
        setQR(res.data);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [toggle, semesterId]);

  // useEffect(() => {
  //   axios
  //     .get(`/linegroups/${path}`)
  //     .then((res) => {
  //       // console.log(res.data);
  //       setLoading(false);
  //       setQR(res.data);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //       setLoading(false);
  //     });
  // }, [toggle]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Err: {error.message} </p>;
  }

  const columns = [
    { id: "deadline", label: "กำหนดการ", sx: { width: "20%" } },
    { id: "todo", label: "รายการที่ต้องทำ", sx: { width: "80%" } },
  ];
  const linkColumns = [];

  return (
    <div className="content">
      <NavBar />
      {/* <Parallax pages={2} style={{ top: "0", left: "0" }} className="animation">
        <ParallaxLayer offset={0} speed={0.25}>
          <div className="animation_layer parallax" id="artback"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={1}>
          <div className="animation_layer parallax" id="layer3"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.45}>
          <div className="animation_layer parallax" id="layer2"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.4}>
          <div className="animation_layer parallax" id="layer1"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}></ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.25} id="main_table">
        </ParallaxLayer>
      </Parallax> */}
      <Paper elevation={4} sx={{opacity:0.75, m:120}}>
      <Stack
        label="default-screen-welcome"
        direction="row"
        justifyContent="space-between"
        gap="160px"
        sx={{ p: 64, display: { sm: "none", md: "flex" } }}
      >
        <Stack>
          <Typography variant="h1" color="#243460">
            Welcome! 
          </Typography><br/>
          <Typography variant="body1" sx={{textIndent:30}}>
            ยินดีต้อนรับเข้าสู่เว็บแอปพลิเคชัน:
            ระบบติดตามความก้าวหน้าของโครงงานวิทยาศาสตร์
            ในภาควิชาคณิตศาสตร์และวิทยาการคอมพิวเตอร์
            โดยมีจุดประสงค์เพื่อใช้เก็บข้อมูลและอัปโหลดเอกสารต่าง ๆ
            จากอาจารย์และนิสิต สามารถติดตามข่าวสารเพิ่มเติมได้ที่ Line group
            ดังนี้
          </Typography>
        </Stack>
        <Stack sx={{ width: "300px" }}>
          <img src={lineQR.qr} width="75%" />
          <br />
          <Link href={lineQR.url} underline="hover" color="secondary">
            {lineQR.url}
          </Link>
        </Stack>
      </Stack></Paper>
      <Stack
        label="smaller-screen-welcome"
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={80}
        sx={{ p: 32, mb: 160, display: { sm: "flex", md: "none" } }}
      >
        <Stack spacing={16}>
          <Typography variant="h1" color="#243460">
            Welcome!
          </Typography>
          <Typography variant="body1">
            ยินดีต้อนรับเข้าสู่เว็บแอปพลิเคชัน:
            ระบบติดตามความก้าวหน้าของโครงงานวิทยาศาสตร์
            ในภาควิชาคณิตศาสตร์และวิทยาการคอมพิวเตอร์
            โดยมีจุดประสงค์เพื่อใช้เก็บข้อมูลและอัปโหลดเอกสารต่าง ๆ
            จากอาจารย์และนิสิต สามารถติดตามข่าวสารเพิ่มเติมได้ที่ Line group
            ดังนี้
          </Typography>
        </Stack>
        <Stack spacing={16} alignItems="center">
          <img src={lineQR.qr} width="200px" />
          <Link href={lineQR.url} underline="hover" color="secondary">
            {lineQR.url}
          </Link>
        </Stack>
      </Stack>
      <Stack spacing={32} alignItems="center" label="Timeline">
        <Typography variant="h3" color="#234FBB">
          {path == "proposal" ? "Proposal" : "Senior Project"} Timeline
        </Typography>
        <CustomizedTimeline timelines={data} />
      </Stack>
      <Footer />
    </div>
  );
}
