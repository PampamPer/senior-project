import React from "react";
import CustomizedTables from "./Table";
import TableFilter from "./TableFilter";
import TableSearch from "./TableSearch";
import PropTypes from "prop-types";
import { Container, Stack } from "@mui/material";

export default function CustomTable(props) {
  const { data, columns, childToParent, linkcolumns, linkname, filteredData, needFilter } =
    props;
  return (
    <Stack spacing={16} sx={{mt:24}}>
      <Stack direction="row" justifyContent="end" alignItems="center">
        <TableSearch data={data} childToParent={childToParent} />
        {needFilter &&<TableFilter
          data={data}
          columns={columns}
          childToParent={childToParent}
          linkcolumns={linkcolumns}
          linkname={linkname}
        />}
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
