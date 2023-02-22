import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Timeline from './Timeline'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { Button } from "@mui/material";
import Table from './Table'

export default function Main() {
  
  // useEffect(()=>
  //   {axios.get('/proposaltimelines')
  //   .then(res => {
  //     console.log(res.data);
  //     setTimeline(res.data);
  //   })
  //   .catch(err => console.log(err))}
  // ,[])
 
  return (
    <div>
      <NavBar />
      <Table/>
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
      <Timeline/> 
    </div>
  );
}
