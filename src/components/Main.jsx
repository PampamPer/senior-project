import NavBar from "./NavBar";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Button, Link, Typography } from "@mui/material";
import Table, { preprocess } from "./Table";
import { AppContext } from "../App";
import Footer from "./Footer";
import { Stack } from "@mui/system";
import CustomizedTimeline from "./Timeline1";

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
      // .get('/proposaltimelines?semesterid=1')
      .then((res) => {
        // console.log("this is res.data", res.data);
        setLoading(false);
        if (res.data) {
          // console.log("get data");
          setData(preprocess(res.data, ["deadline", "todo"], ["deadline"], []));
          // console.log("this is data", data);
        } else {
          setData([]);
          // console.log("dont get data");
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
        // console.log(res.data);
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

  const columns = [
    { id: "deadline", label: "กำหนดการ", sx: { width: "20%" } },
    { id: "todo", label: "รายการที่ต้องทำ", sx: { width: "80%" } },
  ];
  const linkColumns = [];

  return (
    <div>
      <NavBar />


      <Parallax pages={2} style={{ top: "0", left: "0" }} class="animation">
        <ParallaxLayer offset={0} speed={0.25}>
          <div class="animation_layer parallax" id="artback"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={1}>
          <div class="animation_layer parallax" id="layer3"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5}>
          <div class="animation_layer parallax" id="layer2"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.25}>
          <div class="animation_layer parallax" id="layer1"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            gap="250px"
            sx={{ mt: 180, p: 64 }}
          >
            <Stack>
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
            <Stack>
              <img src={lineQR.qr} width="75%" />
              <br />
              <Link href={lineQR.url} underline="hover" color="secondary">
                {lineQR.url}
              </Link>
            </Stack>
          </Stack>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.25}>
          <div id="main_table">
            <Typography variant="h3" color="white">
              {path == "proposal" ? "Proposal" : "Senior Project"} Timeline
            </Typography>
            <CustomizedTimeline timelines={data}/>
            {/* <Table data={data} columns={columns} linkcolumns={linkColumns} /> */}
            <Footer />
          </div>
        </ParallaxLayer>
      </Parallax>
      {/* <Timeline/>  */}
    </div>
  );
}
