import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

export default function Table({
  rows,
  columns,
  pagination, // coming from the server
  limit,
  page,
  setPage,
  setLimit,
  loading,
}) {
  // Handle page and pageSize change
  const handlePaginationChange = (newPaginationModel) => {
    setPage(newPaginationModel.page + 1); // Adjust for 0-based index
    setLimit(newPaginationModel.pageSize);
  };

  return (
    <Paper
      sx={{
        height: 650,
        width: "100%",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ border: 0 }}
        pagination
        loading={loading}
        paginationMode="server" // Enable server-side pagination
        rowCount={pagination.totalItems} // Total rows from the server
        pageSize={limit} // Rows per page
        page={page - 1} // DataGrid's page starts from 0
        onPaginationModelChange={handlePaginationChange} // Handle pagination changes
        paginationModel={{
          page: page - 1, // DataGrid's page starts from 0
          pageSize: limit,
        }}
        rowsPerPageOptions={[5, 10, 20, 50, 100]} // Custom options for rows per page
      />
    </Paper>
  );
}
