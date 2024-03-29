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
import { Link, Stack, Typography } from "@mui/material";

export function preprocess(data, columns, dateColumns, datetimeColumns) {
  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม.",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  const toThaiDateTimeString = (date) => {
    let year = date.getFullYear() + 543;
    let month = monthNames[date.getMonth()];
    let numOfDay = date.getDate();

    let hour = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");
    return (
      `${numOfDay} ${month} ${year} ` +
      `เวลา ` +
      `${hour}:${minutes}:${second} น.`
    );
  };
  const toThaiDateString = (date) => {
    let year = date.getFullYear() + 543;
    let month = monthNames[date.getMonth()];
    let numOfDay = date.getDate();

    let hour = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");
    return `${numOfDay} ${month} ${year} `;
  };
  var processedData = [];
  for (const [index, row] of data.entries()) {
    let newRow = {};
    newRow["tableId"] = index;
    Object.keys(row).forEach((key) => {
      if (columns.includes(key)) {
        if (datetimeColumns.includes(key)) {
          if (row[key] == null) {
            newRow[key] = "-";
          } else {
            newRow[key] = toThaiDateTimeString(new Date(row[key]));
          }
        } else if (dateColumns.includes(key)) {
          if (row[key] == null) {
            newRow[key] = "-";
          } else {
            newRow[key] = toThaiDateString(new Date(row[key]));
          }
        } else {
          newRow[key] = row[key];
        }
      }
    });
    processedData.push(newRow);
  }
  return processedData;
}

export default function CustomizedTables(props) {
  const { data, columns, linkcolumns, linkname } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(data.length);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {data.length == 0 ? (
        <Stack alignItems="center" spacing={32} sx={{ mb: 48 }}>
          <Typography variant="subtitle1" color="red">
            ไม่พบข้อมูล
          </Typography>
        </Stack>
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label="customized table"
            {...props}
          >
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
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((datarow) => (
                <TableRow key={datarow.tableId}>
                  {Object.keys(datarow)
                    .filter((key) => key != "tableId" && key != linkname)
                    .map((key) => (
                      <TableCell key={key}>
                        {linkcolumns.includes(key) ? (
                          <Link
                            href={datarow[key]}
                            underline="hover"
                            color="secondary"
                          >
                            {datarow[linkname]}
                          </Link>
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
                  rowsPerPageOptions={[{ label: "All", value: -1 }, 5, 10, 25]}
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
      )}
    </div>
  );
}

CustomizedTables.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
};
