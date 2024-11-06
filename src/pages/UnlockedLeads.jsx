import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { Cards, Sidebar, DataTable } from "../components/dashboard";
import { LeadAPI } from "../axios";
import { Lock, LockOpen } from "@mui/icons-material";

function UnlockedLeads() {
  const [loading, setLoading] = React.useState(false);
  const [unlockLoading, setUnlockLoading] = React.useState({
    id: null,
    loading: false,
  });
  const [leads, setLeads] = React.useState([]);
  const [unlockedLeads, setUnlockedLeads] = React.useState([]);
  const [stats, setStats] = React.useState([
    {
      title: "Total Leads",
      value: 0,
    },
    {
      title: "Unlocked Leads",
      value: 0,
    },
    {
      title: "My Credits",
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
  const [orderBy, setOrderBy] = React.useState("lead_time");
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      setLoading(true);
      // let { page, limit, search, sortBy, order } = query;
      LeadAPI.getUnlockedLeads(page, limit, search, orderBy, order)
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
      LeadAPI.getStats().then((res) => {
        if (res.status === 200) {
          setStats([
            {
              title: "Total Leads",
              value: res.data.data.totalLeads,
            },
            {
              title: "Unlocked Leads",
              value: res.data.data.unlockedLeads,
            },
            {
              title: "My Credits",
              value: res.data.data.myCredits.credits,
            },
          ]);
        }
      });
    }
  }, [page, refresh, limit, order, orderBy, search]);

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "car_brand_name", headerName: "Car Name", width: 100 },
    { field: "car_model", headerName: "Car Model", width: 300 },
    { field: "lead_time", headerName: "Date", width: 100 },
    { field: "unlock_date", headerName: "Unlock Date", width: 150 },
    { field: "credits_used", headerName: "Credits Used", width: 100 },
  ];

  const rows = leads.map((lead) => {
    return {
      id: lead.unlock_id,
      name: lead.lead_final.name,
      email: lead.lead_final.email,
      phone: (
        <a href={`https://wa.me/${lead.lead_final.phone}`} target="_blank" rel="noreferrer">
          {lead.lead_final.phone}
        </a>
      ),
      car_brand_name: lead.lead_final.car_brand_relationship.car_brand_name,
      car_model: lead.lead_final.car_model,
      lead_time: lead.lead_final.lead_time,
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

export default UnlockedLeads;
