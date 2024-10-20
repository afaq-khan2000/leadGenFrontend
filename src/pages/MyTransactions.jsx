import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { Cards, Sidebar, DataTable } from "../components/dashboard";
import { AuthAPI, LeadAPI } from "../axios";
import { Lock, LockOpen } from "@mui/icons-material";

function MyTransactions() {
  const [loading, setLoading] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
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
  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      setLoading(true);
      AuthAPI.getStripeTransactions()
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            setTransactions(res.data.data.transactions.data);
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
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
  }, [refresh]);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "created", headerName: "Transaction Date", width: 200 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "currency", headerName: "Currency", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "last4", headerName: "Card Last 4 Digits", width: 200 },
    { field: "brand", headerName: "Card Brand", width: 150 },
    { field: "receipt_url", headerName: "Receipt", width: 500 },
  ];

  const rows = transactions.map((transaction) => {
    return {
      id: transaction.id,
      created: new Date(transaction.created * 1000).toLocaleString(),
      amount: transaction.amount / 100,
      currency: transaction.currency,
      status: transaction.status,
      last4: transaction.payment_method_details.card.last4,
      brand: transaction.payment_method_details.card.brand,
      receipt_url: (
        <a href={transaction.receipt_url} target="_blank">
          View Receipt
        </a>
      ),
    };
  });

  return (
    <Box>
      {/* <Sidebar> */}
      <Cards data={stats} />
      <DataTable
        columns={columns}
        rows={rows}
        dontShowPagination={true}
        loading={loading}
      />
      {/* <DataTable columns={columns} rows={rows} pagination={pagination} page={page} setPage={setPage} limit={limit} setLimit={setLimit} leads={leads} setLeads={setLeads} setRefresh={setRefresh} refresh={refresh} loading={loading} search={search} setSearch={setSearch} order={order} setOrder={setOrder} orderBy={orderBy} setOrderBy={setOrderBy} /> */}
      {/* </Sidebar> */}
    </Box>
  );
}

export default MyTransactions;
