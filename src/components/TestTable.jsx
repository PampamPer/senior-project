import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import Table from './Table'

export default function TestTable() {
  const [timelines, setTimeline] = useState([]);
  const path = localStorage.getItem("projectPath") || "project";
  const { toggle, semesterId } = useContext(AppContext);

  useEffect(() => {
    axios
      .get(`/${path}timelines?semesterid=${semesterId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setTimeline(res.data);
        } else {
          setTimeline([]);
        }
      })
      .catch((err) => console.log(err));
  }, [toggle, semesterId]);

  return (
    <Table props={timelines}/>
  )
}
