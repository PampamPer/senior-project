import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ToggleContext } from "../App";

export default function Main() {
  const [timelines, setTimeline] = useState([]);
  const path = localStorage.getItem('projectPath') || 'proposal' 
  const { toggle, semesterId } = useContext(ToggleContext)

  useEffect(()=>
    {axios.get(`/${path}timelines?semesterid=${semesterId}`)
    // {axios.get(`/${path}timelines?semesterid=2`)
    .then(res => {
      console.log(res.data);
      if(res.data)
      {setTimeline(res.data);}
      else{ setTimeline([]);}
    })
    .catch(err => console.log(err))}
  ,[toggle, semesterId])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Deadline</TableCell>
              <TableCell>Detail</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {timelines?.map((timeline) => (
              <TableRow>
                  <TableCell sx={{ minWidth: 160}}>{timeline.deadline}</TableCell>
                  <TableCell>{timeline.todo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
