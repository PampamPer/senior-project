import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ignoreColumn = ["semester", "id", "semesterId"];
const callback = (key) => !ignoreColumn.includes(key);

function createData(id, semesterId, semester, deadline, todo) {
  return { id, semesterId, semester, deadline, todo };
}

const timelines = [
  createData(
    1,
    2,
    "2565/2",
    "2023-01-31",
    "นิสิตอัปโหลดไฟล์ สป.1 และ สป. 2 ได้ตั้งแต่วันที่ 9 ม.ค. 2567"
  ),
  createData(
    2,
    2,
    "2565/2",
    "2023-02-28",
    "นิสิตแจ้งอาจารย์ผู้ประสานงานรายวิชาเพื่อขออัปเดตข้อมูลโครงงาน (กรณีเปลี่ยนอาจารย์ที่ปรึกษา สมาชิกในกลุ่ม หรือหัวข้อโครงงาน) ได้ตั้งแต่วันที่ 9 ม.ค. 2567"
  ),
  createData(
    3,
    2,
    "2565/2",
    "2023-02-28",
    "ระบบแสดงตารางสรุปรวมบนหน้าเว็บก่อนสอบ/จัดนิทรรศการ"
  ),
  createData(
    4,
    2,
    "2565/2",
    "2023-03-10",
    "สัปดาห์สอบกลางภาค เริ่มตั้งแต่วันที่ 3 มี.ค. 2567"
  ),
  createData(
    5,
    2,
    "2565/2",
    "2023-04-01",
    "อาจารย์ผู้ประสานงานรายวิชาอัปโหลดไฟล์ สป. 3 ที่ภาคส่งออกและที่คณะอนุมัติ"
  ),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      {console.log(timelines)}
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {Object.keys(timelines[0])
              .filter(callback)
              .map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timelines.map((timeline) => (
            <TableRow key={timeline.id}>
              {Object.keys(timeline)
                .filter(callback)
                .map((key) => (
                  <TableCell key={key}>{timeline[key]}</TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
