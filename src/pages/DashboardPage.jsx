import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Cards, Sidebar, Table } from "../components/dashboard";
import { LeadAPI } from "../axios";
import { Lock, LockOpen } from "@mui/icons-material";

function DashboardPage() {
  const [loading, setLoading] = React.useState(false);
  const [leads, setLeads] = React.useState([]);
  const [unlockedLeads, setUnlockedLeads] = React.useState([]);
  const [stats, setStats] = React.useState({
    totalLeads: 0,
    unlockedLeads: 0,
    myCredits: 0,
  });
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
          setStats({
            totalLeads: res.data.data.totalLeads,
            unlockedLeads: res.data.data.unlockedLeads,
            myCredits: res.data.data.myCredits.credits,
          });
        }
      });
    }
  }, [page, refresh, limit]);

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "car_brand_name", headerName: "Car Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "lead_time", headerName: "Date", flex: 1 },
    {
      field: "is_unlocked",
      headerName: "Unlock",
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            {params.row.is_unlocked ? (
              <LockOpen />
            ) : (
                <Lock />
            )}
          </div>
        );
      }
    },
  ];
  

  const rows = leads.map((lead) => {
    return {
      id: lead.lead_id,
      name: lead.is_unlocked ? lead.name : "********",
      car_brand_name: lead.is_unlocked
        ? lead.car_brand_relationship?.car_brand_name
        : "********",
      email: lead.is_unlocked ? lead.email : "********",
      phone: lead.is_unlocked ? lead.phone : "********",
      lead_time: lead.lead_time,
      is_unlocked: lead.is_unlocked,
    };
  });
  
  return (
    <Box>
      <Sidebar>
        <Cards />
        <Table columns={columns} rows={rows} pagination={pagination} page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
      </Sidebar>
    </Box>
  );
}

export default DashboardPage;
