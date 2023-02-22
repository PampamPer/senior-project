import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import TablePaginationActions from "./TablePagination";


export default function Main() {
  const [timelines, setTimeline] = useState([]);
  const path = localStorage.getItem("projectPath") || "project";
  const { toggle, semesterId } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - timelines.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            {console.log(Object.keys(timelines))}
            {console.log(timelines[0])}

              {/* {Object.keys(timelines).map((header) => (
                  
                  // <TableCell>{header}</TableCell>
                ))} */}
              <TableCell sx={{ width: 160 }}>Deadline</TableCell>
              <TableCell>Detail</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
            ? timelines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : timelines).map((timeline) => (
              <TableRow>
                <TableCell sx={{ minWidth: 160 }}>
                  {timeline.deadline}
                </TableCell>
                <TableCell>{timeline.todo}</TableCell>
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
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={timelines.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
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
    </div>
  );
}
