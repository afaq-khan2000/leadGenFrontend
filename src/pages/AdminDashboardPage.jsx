import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { Cards, Sidebar, DataTable } from "../components/dashboard";
import { AdminAPI, LeadAPI } from "../axios";
import { Lock, LockOpen } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function AdminDashboardPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [unlockLoading, setUnlockLoading] = React.useState({
    id: null,
    loading: false,
  });
  const [users, setUsers] = React.useState([]);
  const [unlockedLeads, setUnlockedLeads] = React.useState([]);
  const [stats, setStats] = React.useState([
    {
      title: "Total Users",
      value: 0,
    },
    {
      title: "Total Leads",
      value: 0,
    },
    {
      title: "Unlocked Leads",
      value: 0,
    },
  ]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(30);
  const [hasMore, setHasMore] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
  });
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("created_at");
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      setLoading(true);
      // let { page, limit, search, sortBy, order } = query;
      AdminAPI.getAllUsers(page, limit, search, orderBy, order)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            setUsers(res.data.data.users);
            setPagination({
              totalItems: res.data.data.pagination.totalItems,
              currentPage: res.data.data.pagination.currentPage,
              totalPages: res.data.data.pagination.totalPages,
            });
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
        });

      // totalUsers,
      // totalLeads,
      // unlockedLeads,

      AdminAPI.getStats().then((res) => {
        if (res.status === 200) {
          setStats([
            {
              title: "Total Users",
              value: res.data.data.totalUsers,
            },
            {
              title: "Total Leads",
              value: res.data.data.totalLeads,
            },
            {
              title: "Unlocked Leads",
              value: res.data.data.unlockedLeads,
            },
          ]);
        }
      });
    }
  }, [page, refresh, limit, order, orderBy, search]);

  const columns = [
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    { field: "dealership_name", headerName: "Dealership Name", width: 150 },
    { field: "created_at", headerName: "Joined At", width: 150 },
  ];

  const rows = users.map((user) => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      first_name: user.first_name,
      last_name: user.last_name,
      dealership_name: user.dealership_name,
      created_at: user.created_at,
    };
  });

  return (
    <Box>
      {/* <Sidebar> */}
      <Cards data={stats} />
      <DataTable
        columns={columns}
        rows={rows}
        pagination={pagination}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        setRefresh={setRefresh}
        refresh={refresh}
        loading={loading}
        search={search}
        setSearch={setSearch}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      {/* </Sidebar> */}
    </Box>
  );
}

export default AdminDashboardPage;
