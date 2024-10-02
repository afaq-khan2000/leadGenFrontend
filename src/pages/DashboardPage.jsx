import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { Cards, Sidebar, Table } from "../components/dashboard";
import { LeadAPI } from "../axios";
import { Lock, LockOpen } from "@mui/icons-material";

function DashboardPage() {
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
  const [limit, setLimit] = React.useState(10);
  const [hasMore, setHasMore] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      setLoading(true);
      LeadAPI.getAllLeads(page, limit).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setLeads(res.data.data.leads);
          setPagination({
            totalItems: res.data.data.pagination.totalItems,
            currentPage: res.data.data.pagination.currentPage,
            totalPages: res.data.data.pagination.totalPages,
          });
        }
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
  }, [page, refresh, limit]);

  const handleUnlock = (id) => {
    setUnlockLoading({
      id: id,
      loading: true,
    });
    LeadAPI.unlockLead(id)
      .then((res) => {
        if (res.status === 200) {
          setRefresh(!refresh);
        }
        setUnlockLoading({
          id: null,
          loading: false,
        });
      })
      .catch((error) => {
        setUnlockLoading({
          id: null,
          loading: false,
        });
        alert(error.response.data.message);
      });
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "car_brand_name", headerName: "Car Name", flex: 1 },
    { field: "car_model", headerName: "Car Model", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "lead_time", headerName: "Date", flex: 1 },
    {
      field: "is_unlocked",
      headerName: "Unlock",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.is_unlocked ? <LockOpen /> : unlockLoading.loading && unlockLoading.id === params.row.id ? <CircularProgress size={20} /> : <Lock onClick={() => handleUnlock(params.row.id)} />}</div>;
      },
    },
  ];

  const rows = leads.map((lead) => {
    return {
      id: lead.lead_id,
      name: lead.name,
      car_brand_name: lead.car_brand_relationship?.car_brand_name,
      car_model: lead.car_model,
      email: lead.is_unlocked ? lead.email : "********",
      phone: lead.is_unlocked ? lead.phone.split(".")[0] : "********",
      lead_time: lead.lead_time,
      is_unlocked: lead.is_unlocked,
    };
  });

  return (
    <Box>
      <Sidebar>
        <Cards data={stats} />
        <Table columns={columns} rows={rows} pagination={pagination} page={page} setPage={setPage} limit={limit} setLimit={setLimit} leads={leads} setLeads={setLeads} setRefresh={setRefresh} refresh={refresh} loading={loading} />
      </Sidebar>
    </Box>
  );
}

export default DashboardPage;
