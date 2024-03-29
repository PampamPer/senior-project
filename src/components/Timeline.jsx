import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import { Paper, Stack, TableBody, TableCell, Typography } from "@mui/material";
import { useState } from "react";
import TimelineContent from "@mui/lab/TimelineContent";

import TableContainer from "@mui/material/TableContainer";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import TablePaginationActions from "./TablePagination";
import TablePagination from "@mui/material/TablePagination";

export default function CustomizedTimeline(props) {
  const { timelines } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(timelines.length);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - timelines.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {timelines.length == 0 ? (
        <Stack alignItems="center" spacing={32} sx={{ mb: 48 }}>
          <Typography variant="subtitle1" color="red">
            ไม่พบข้อมูล
          </Typography>
        </Stack>
      ) : (
        <div>
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
              gap: 16,
            }}
          >
            {(rowsPerPage > 0
              ? timelines.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : timelines
            ).map((timeline, index) => (
              <TimelineItem key={index} sx={{ gap: 24 }}>
                <TimelineSeparator>
                  <TimelineDot sx={{ backgroundColor: "#2D95E1" }} />
                  <TimelineConnector sx={{ backgroundColor: "#8FE7FF" }} />
                </TimelineSeparator>
                <Paper sx={{ width: "75%" }}>
                  <TimelineContent color="textSecondary">
                    {timeline.deadline}
                  </TimelineContent>
                  <TimelineContent color="textPrimary">
                    {timeline.todo}
                  </TimelineContent>
                </Paper>
              </TimelineItem>
            ))}
            {/* {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )} */}
          </Timeline>
          <TableContainer>
            <Table>
              <TableBody>
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      { label: "All", value: -1 },
                      5,
                      10,
                      25,
                    ]}
                    colSpan={3}
                    count={timelines.length}
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
        </div>
      )}
    </div>
  );
}

CustomizedTimeline.propTypes = {
  timelines: PropTypes.array,
};
