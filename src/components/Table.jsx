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

export function preprocess(data, columns) {
  // console.log("before", data); // DEBUG
  var processedData = [];
  for (const [index, row] of data.entries()) {
    let newRow = {};
    console.log(index, row);
    newRow["id"] = index;
    Object.keys(row).forEach((key) => {
      if (columns.includes(key)) {
        newRow[key] = row[key];
      }
    });
    processedData.push(newRow);
  }
  // console.log("after", processedData); // DEBUG
  return processedData;
}

export default function CustomizedTables(props) {
  const { data, columns, linkcolumns } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log("this is data", data);
  console.log("this is columns", columns);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" {...props}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} sx={column.sx}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((datarow) => (
            <TableRow key={datarow.id}>
              {Object.keys(datarow)
                .filter((key) => key != "id")
                .map((key) => (
                  <TableCell key={key}>
                    {linkcolumns.includes(key) ? (
                      <a href={datarow[key]}>{datarow[key]}</a>
                    ) : (
                      datarow[key]
                    )}
                  </TableCell>
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

CustomizedTables.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
};
