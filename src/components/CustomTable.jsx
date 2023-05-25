import React from "react";
import CustomizedTables from "./Table";
import TableFilter from "./TableFilter";
import TableSearch from "./TableSearch";
import PropTypes from "prop-types";
import { Button, Container, Stack } from "@mui/material";
import ProjectInfoFilter from "./ProjectInfoFilter";

export default function CustomTable(props) {
  const {
    data,
    columns,
    childToParent,
    linkcolumns,
    linkname,
    filteredData,
    originalFilter,
    setFilter,
    isProjectInfo,
    openModal1,
    openModal2,
  } = props;
  return (
    <Stack spacing={32} sx={{ mt: 40 }}>
      <Stack direction="row" alignItems="center">
        {isProjectInfo && (
          <Stack
            direction="row"
            spacing={16}
            sx={{ position: "absolute", left: 0 }}
          >
            <Button variant="contained" onClick={() => openModal1(true)}>
              ประวัติการส่งงาน
            </Button>
            <Button variant="outlined" onClick={() => openModal2(true)}>
              ใบรายงานผลสอบ
            </Button>
          </Stack>
        )}
        {data.length != 0 && (
          <Stack direction="row" sx={{ position: "absolute", right: 0 }}>
            <TableSearch data={data} childToParent={childToParent} />
            {originalFilter ? (
              <TableFilter
                data={data}
                columns={columns}
                childToParent={childToParent}
                linkcolumns={linkcolumns}
                linkname={linkname}
              />
            ) : (
              <ProjectInfoFilter setFilter={setFilter} />
            )}
          </Stack>
        )}
      </Stack>
      <CustomizedTables
        data={filteredData}
        columns={columns}
        linkcolumns={linkcolumns}
        linkname={linkname}
      />
    </Stack>
  );
}

CustomTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
};
