import NavBar from "./NavBar";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Button } from "@mui/material";
import Table, { preprocess } from "./Table";
import { AppContext } from "../App";
import Footer from "./Footer";

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
          setData(preprocess(res.data, ["deadline", "todo"]));
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
    { id: "deadline", label: "Deadline", sx: { width: "50%" } },
    { id: "todo", label: "To Do", sx: { width: "50%" } },
  ];
  const linkColumns = [];

  return (
    <div>
      <NavBar />
      <img src={lineQR.qr} width="200px" />
      <br />
      {lineQR.url}
      <Table data={data} columns={columns} linkcolumns={linkColumns} />
      {/* <Parallax pages={2}>
        <ParallaxLayer offset={0} speed={0.25}>
          <div className="" id="layer3"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.25}>
          <div  className="" id="layer2"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.25}>
          <div  className="" id="layer1"></div>
        </ParallaxLayer>
      </Parallax>*/}
      {/* <Timeline/>  */}
      <Footer />
    </div>
  );
}
