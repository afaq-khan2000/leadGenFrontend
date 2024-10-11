// // import * as React from "react";
// // import { DataGrid } from "@mui/x-data-grid";
// // import Paper from "@mui/material/Paper";

// // export default function Table({
// //   rows,
// //   columns,
// //   pagination, // coming from the server
// //   limit,
// //   page,
// //   setPage,
// //   setLimit,
// //   loading,
// // }) {
// //   // Handle page and pageSize change
// //   const handlePaginationChange = (newPaginationModel) => {
// //     setPage(newPaginationModel.page + 1); // Adjust for 0-based index
// //     setLimit(newPaginationModel.pageSize);
// //   };

// //   return (
// //     <Paper
// //       sx={{
// //         height: 650,
// //         width: "100%",
// //       }}
// //     >
// //       <DataGrid
// //         rows={rows}
// //         columns={columns}
// //         sx={{ border: 0 }}
// //         pagination
// //         loading={loading}
// //         paginationMode="server" // Enable server-side pagination
// //         rowCount={pagination.totalItems} // Total rows from the server
// //         pageSize={limit} // Rows per page
// //         page={page - 1} // DataGrid's page starts from 0
// //         onPaginationModelChange={handlePaginationChange} // Handle pagination changes
// //         onPageSizeChange={(newPageSize) => setLimit(newPageSize)} // Handle page size changes
// //         paginationModel={{ page: page - 1, pageSize: limit }} // Control pagination from outside
// //         rowsPerPageOptions={[5, 10, 20, 50, 100]} // Custom options for rows per page
// //       />
// //     </Paper>
// //   );
// // }

// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TableSortLabel,
//   CircularProgress,
//   Box,
//   Typography,
//   TextField,
// } from "@mui/material";

// function DataTable({
//   columns,
//   rows,
//   pagination,
//   page,
//   setPage,
//   limit,
//   setLimit,
//   loading,
//   order,
//   setOrder,
//   orderBy,
//   setOrderBy,
//   search,
//   setSearch,
// }) {

//   const handlePageChange = (_, newPage) => {
//     setPage(newPage + 1);
//   };

//   const handleLimitChange = (event) => {
//     setLimit(parseInt(event.target.value, 10));
//     setPage(1); // Reset to the first page
//   };

//   const handleSearchChange = (event) => {
//     const searchValue = event.target.value;
//     setSearch(searchValue);
//   };

//   const handleSort = (column) => {
//     const isAsc = orderBy === column.field && order === "asc";
//     const newOrder = isAsc ? "desc" : "asc";
//     setOrder(newOrder);
//     setOrderBy(column.field);
//   };

//   return (
//     <Box
//     sx={{
//       display: "flex",
//       flexDirection: "column",
//       height: "100%",
//       width: "100%",
//     }}
//     >
//       <Box mb={2}>
//         <TextField
//           label="Search"
//           variant="outlined"
//           size="small"
//           value={search}
//           onChange={handleSearchChange}
//         />
//       </Box>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell key={column.field} sortDirection={orderBy === column.field ? order : false}>
//                   <TableSortLabel
//                     active={orderBy === column.field}
//                     direction={orderBy === column.field ? order.toLowerCase() : "asc"}
//                     onClick={() => handleSort(column)}
//                   >
//                     {column.headerName}
//                   </TableSortLabel>
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                   <CircularProgress />
//                 </TableCell>
//               </TableRow>
//             ) : rows.length > 0 ? (
//               rows.map((row) => (
//                 <TableRow key={row.id}>
//                   {columns.map((column) => (
//                     <TableCell key={column.field}>
//                       {column.renderCell ? column.renderCell({ row }) : row[column.field]}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                   <Typography>No data available</Typography>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 30, 50, 100, 200, 500]}
//         component="div"
//         count={pagination.totalItems}
//         rowsPerPage={limit}
//         page={page - 1}
//         onPageChange={handlePageChange}
//         onRowsPerPageChange={handleLimitChange}
//       />
//     </Box>
//   );
// }

// export default DataTable;

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  CircularProgress,
  Box,
  Typography,
  TextField,
  Paper,
} from "@mui/material";

function DataTable({
  columns,
  rows,
  pagination,
  page,
  setPage,
  limit,
  setLimit,
  loading,
  order,
  setOrder,
  orderBy,
  setOrderBy,
  search,
  setSearch,
  dontShowPagination = false,
}) {
  const handlePageChange = (_, newPage) => {
    setPage(newPage + 1);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
  };

  const handleSort = (column) => {
    const isAsc = orderBy === column.field && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy(column.field);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Box mb={2}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          sx={{ minWidth: 200 }}
        />
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          sx={{
            maxHeight: "calc(100vh - 250px)", // Adjust based on your layout
            width: "100%",
            overflowX: "auto",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#555",
              },
            },
          }}
        >
          <Table
            sx={{
              minWidth: 750, // Minimum width to prevent cramping
              tableLayout: "fixed", // This helps with column width distribution
            }}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    sortDirection={orderBy === column.field ? order : false}
                    sx={{
                      width: column.width || "auto",
                      minWidth: column.minWidth || 150, // Minimum width for columns
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      backgroundColor: "background.paper",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === column.field}
                      direction={
                        orderBy === column.field ? order.toLowerCase() : "asc"
                      }
                      onClick={() => handleSort(column)}
                    >
                      {column.headerName}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow key={row.id} hover>
                    {columns.map((column) => (
                      <TableCell
                        key={column.field}
                        sx={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          padding: "16px",
                        }}
                      >
                        {column.renderCell
                          ? column.renderCell({ row })
                          : row[column.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Typography>No data available</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {!dontShowPagination && (
          <TablePagination
            rowsPerPageOptions={[10, 30, 50, 100, 200, 500]}
            component="div"
            count={pagination.totalItems}
            rowsPerPage={limit}
            page={page - 1}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            sx={{
              position: "sticky",
              bottom: 0,
              backgroundColor: "background.paper",
              borderTop: 1,
              borderColor: "divider",
            }}
          />
        )}
      </Paper>
    </Box>
  );
}

export default DataTable;
