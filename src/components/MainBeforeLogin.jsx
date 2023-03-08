import NavBar from "./NavBar";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Timeline from './Timeline'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { Button } from "@mui/material";
import Table from './Table'
import { AppContext } from "../App";

export default function Main() {
  const [data, setData] = useState([]);
  const path = localStorage.getItem("projectPath") || "project";
  const { toggle, semesterId } = useContext(AppContext);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    axios
      .get(`/${path}timelines?semesterid=${semesterId}`)
      // .get('/proposaltimelines?semesterid=1')
      .then((res) => {
        console.log(res.data);
        setLoading(false)
        if (res.data) {
          console.log('get data')
          setData(res.data);
        } else {
          setData([]);
          console.log('dont get data')
        }
      })
      .catch((err) => 
      {setError(err);
      setLoading(false);});
  }, [toggle, semesterId]);
 
  if (loading){
    return <p>loading...</p>
  }

  if (error) {
    return <p>Err: {error.messag} </p>
  }
  return (
    <div>
      <NavBar />
      <Table data={data} columns={['deadline', 'todo']}/>
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
    </div>
  );
}
