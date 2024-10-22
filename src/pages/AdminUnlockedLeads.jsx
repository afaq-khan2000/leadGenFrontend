import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { Cards, Sidebar, DataTable } from "../components/dashboard";
import { AdminAPI, LeadAPI } from "../axios";
import { Lock, LockOpen } from "@mui/icons-material";

function AdminUnlockedLeads() {
  const [loading, setLoading] = React.useState(false);
  const [unlockLoading, setUnlockLoading] = React.useState({
    id: null,
    loading: false,
  });
  const [leads, setLeads] = React.useState([]);
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
  const [orderBy, setOrderBy] = React.useState("unlock_date");
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      setLoading(true);
      // let { page, limit, search, sortBy, order } = query;
      AdminAPI.getAllUnlockedLeads(page, limit, search, orderBy, order)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            setLeads(res.data.data.leads);
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
          console.log(error);
          setLoading(false);
        });
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

  //   if (sortBy === "lead_name") {
  //     sortOrder = [[{ model: DB.LeadModel, as: "lead_final" }, "name", order]];
  //   } else if (sortBy === "lead_email") {
  //     sortOrder = [[{ model: DB.LeadModel, as: "lead_final" }, "email", order]];
  //   } else if (sortBy === "lead_phone") {
  //     sortOrder = [[{ model: DB.LeadModel, as: "lead_final" }, "phone", order]];
  //   } else if (sortBy === "car_brand_name") {
  //     sortOrder = [[{ model: DB.LeadModel, as: "lead_final" }, { model: DB.CarBrandModel, as: "car_brand_relationship" }, "car_brand_name", order]];
  //   } else if (sortBy === "car_model") {
  //     sortOrder = [[{ model: DB.LeadModel, as: "lead_final" }, "car_model", order]];
  //   } else if (sortBy === "unlock_date") {
  //     sortOrder = ["unlock_date", order];
  //   } else if (sortBy === "credits_used") {
  //     sortOrder = ["credits_used", order];
  //   } else {
  //     sortOrder = [["unlock_date", order]];
  //   }

  const columns = [
    // { field: "name", headerName: "Name", width: 150 },
    { field: "lead_name", headerName: "Lead Name", width: 150 },
    { field: "username", headerName: "Unlocked By", width: 150 },
    { field: "lead_email", headerName: "Email", width: 150 },
    { field: "lead_phone", headerName: "Phone", width: 150 },
    { field: "car_brand_name", headerName: "Car Brand", width: 150 },
    { field: "car_model", headerName: "Car Model", width: 150 },
    { field: "lead_time", headerName: "Lead Time", width: 150 },
    { field: "unlock_date", headerName: "Unlock Date", width: 150 },
    { field: "credits_used", headerName: "Credits Used", width: 150 },
  ];

  const rows = leads.map((lead) => {
    return {
      id: lead.id,
      lead_name: lead.lead_final.name,
        username: lead.user.username,
      lead_email: lead.lead_final.email,
      lead_phone: lead.lead_final.phone,
      car_brand_name: lead.lead_final.car_brand_relationship.car_brand_name,
      car_model: lead.lead_final.car_model,
      lead_time: new Date(lead.lead_final.lead_time).toLocaleString(),
      unlock_date: new Date(lead.unlock_date).toLocaleString(),
      credits_used: lead.credits_used,
    };
  });

  return (
    <Box>
      {/* <Sidebar> */}
      <Cards data={stats} />
      <DataTable columns={columns} rows={rows} pagination={pagination} page={page} setPage={setPage} limit={limit} setLimit={setLimit} leads={leads} setLeads={setLeads} setRefresh={setRefresh} refresh={refresh} loading={loading} search={search} setSearch={setSearch} order={order} setOrder={setOrder} orderBy={orderBy} setOrderBy={setOrderBy} />
      {/* </Sidebar> */}
    </Box>
  );
}

export default AdminUnlockedLeads;
