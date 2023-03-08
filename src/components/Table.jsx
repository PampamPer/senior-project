import * as React from "react";
import { styled } from "@mui/material/styles";
import { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "./TablePagination";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

const ignoreColumn = ["semester", "id", "semesterId"];
const callback = (key) => !ignoreColumn.includes(key);

// function createData(id, semesterId, semester, deadline, todo) {
//   return { id, semesterId, semester, deadline, todo };
// }

// const data = [
//   createData(
//     1,
//     2,
//     "2565/2",
//     "2023-01-31",
//     "นิสิตอัปโหลดไฟล์ สป.1 และ สป. 2 ได้ตั้งแต่วันที่ 9 ม.ค. 2567"
//   ),
//   createData(
//     2,
//     2,
//     "2565/2",
//     "2023-02-28",
//     "นิสิตแจ้งอาจารย์ผู้ประสานงานรายวิชาเพื่อขออัปเดตข้อมูลโครงงาน (กรณีเปลี่ยนอาจารย์ที่ปรึกษา สมาชิกในกลุ่ม หรือหัวข้อโครงงาน) ได้ตั้งแต่วันที่ 9 ม.ค. 2567"
//   ),
//   createData(
//     3,
//     2,
//     "2565/2",
//     "2023-02-28",
//     "ระบบแสดงตารางสรุปรวมบนหน้าเว็บก่อนสอบ/จัดนิทรรศการ"
//   ),
//   createData(
//     4,
//     2,
//     "2565/2",
//     "2023-03-10",
//     "สัปดาห์สอบกลางภาค เริ่มตั้งแต่วันที่ 3 มี.ค. 2567"
//   ),
//   createData(
//     5,
//     2,
//     "2565/2",
//     "2023-04-01",
//     "อาจารย์ผู้ประสานงานรายวิชาอัปโหลดไฟล์ สป. 3 ที่ภาคส่งออกและที่คณะอนุมัติ"
//   ),
//   createData(6, 2, "2565/2", "2023-04-01", "6"),
//   createData(7, 2, "2565/2", "2023-04-01", "7"),
//   createData(8, 2, "2565/2", "2023-04-01", "8"),
//   createData(9, 2, "2565/2", "2023-04-01", "9"),
//   createData(10, 2, "2565/2", "2023-04-01", "10"),
// ];

export default function CustomizedTables(props) {
  const { data, columns } = props;
  console.log('in comp', props)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    ssetPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" {...props}>
        <TableHead>
          <TableRow>
            {columns
              .filter(callback)
              .map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {console.log(
            data.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
          )} */}
          {(rowsPerPage > 0
            ? data.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : data
          ).map((timeline) => (
            <TableRow key={timeline.id}>
              {Object.keys(timeline)
                .filter(callback)
                .map((key) => (
                  <TableCell key={key}>{timeline[key]}</TableCell>
                ))}
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

CustomizedTables.propTypes= {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
};
