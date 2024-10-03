import React from "react";
import { Box, Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { AuthAPI } from "../../axios";

function Cards({
  data = [
    {
      title: "My Credits",
      value: 1000,
    },
    {
      title: "Total Leads",
      value: 100,
    },
    {
      title: "Unlocked Leads",
      value: 50,
    },
  ],
}) {
  const [loading, setLoading] = React.useState(false);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", my: 5, flexWrap: "wrap" }}>
      {data.map((card, index) => (
        <Card
          key={index}
          sx={{
            height: 150,
            width: { xs: "100%", md: "30%" },
            mb: { xs: 2, md: 0 },
            backgroundColor: "#f5f5f5",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {card.title}
            </Typography>
            <Typography variant="h4" color="text.primary">
              {card.value}
            </Typography>
            {card.title === "My Credits" && (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 1, width: "100%", minWidth: "100%" }}
                onClick={async () => {
                  setLoading(true);
                  const res = await AuthAPI.checkoutSession();
                  setLoading(false);
                  window.location.href = res.data.data.session.url;
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    color="
                  inherit
                  "
                  />
                ) : (
                  "Buy 100 Credits for AED 100"
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default Cards;
