import React, { useEffect, useContext, useState } from 'react'
import Footer from './Footer';
import NavBar from './NavBar'
import Table from './Table'
import { AppContext } from "../App";
import axios from 'axios';

export default function DownloadFiles() {
  const [data, setData] = useState([]);
  const path = localStorage.getItem("projectPath") || "project";
  const { toggle } = useContext(AppContext);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    axios
      .get(`/${path}downloads`)
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
  }, [toggle]);

  if (loading){
    return <p>loading...</p>
  }

  if (error) {
    return <p>Err: {error.message} </p>
  }

  return (
    <div>
      <NavBar/>
      <Table data={data} columns={['ชื่อเอกสาร', 'ดาวน์โหลดเอกสาร', 'แก้ไขล่าสุด', 'ขนาดไฟล์']}/> 
      <Footer/>
    </div>
  )
}
